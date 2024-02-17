import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { GetStorage, SetStorage } from '~/app/application/protocols/cache';

type FailedRequestQueueProps = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

export class AxiosHttpAuth {
  retry = false;
  failedRequestQueue: FailedRequestQueueProps[] = [];

  constructor(
    private readonly urlRefreshToken: string,
    private readonly axiosInstance: AxiosInstance,
    private readonly serviceStorage: SetStorage & GetStorage
  ) {}

  getAxiosInstance(): AxiosInstance {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const credentials = this.serviceStorage.get('eform:account');
        if (error.response?.status === 401 && credentials?.refreshToken) {
          const originalConfig = error.config;
          const originalData = JSON.parse(originalConfig.data);
          if (!this.retry) {
            this.retry = true;
            this.axiosInstance
              .post(this.urlRefreshToken, null, {
                headers: {
                  Authorization: `Bearer ${credentials.refreshToken as string}`
                }
              })
              .then((response: AxiosResponse) => {
                this.serviceStorage.set('eform:account', response.data);
                this.failedRequestQueue.forEach(request => {
                  request.onSuccess(response.data?.accessToken);
                });
              })
              .catch((error: AxiosError) => {
                this.failedRequestQueue.forEach(request => {
                  request.onFailure(error);
                });
              })
              .finally(() => {
                this.failedRequestQueue = [];
                this.retry = false;
              });
            return await new Promise((resolve, reject) => {
              originalConfig.data = originalData;
              this.failedRequestQueue.push({
                onSuccess: (token: string) => {
                  originalConfig.headers = {
                    Authorization: `Bearer ${token}`
                  };
                  resolve(this.axiosInstance(originalConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                }
              });
            });
          }
        }
        if (error.response?.status === 403) {
          this.serviceStorage.set('eform:account');
        }
        return await Promise.reject(error);
      }
    );
    return this.axiosInstance;
  }
}
