import axios, { AxiosInstance } from 'axios';

export const makeAxios = (): AxiosInstance => {
  const { NEXT_PUBLIC_BASE_URL } = process.env;
  return axios.create({
    baseURL: NEXT_PUBLIC_BASE_URL
  });
};
