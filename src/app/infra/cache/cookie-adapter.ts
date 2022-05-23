import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { GetStorage, SetStorage } from '~/app/application/protocols/cache'

export class CookieAdapter implements SetStorage, GetStorage {
  constructor(private readonly context?: any) {}

  set(key: string, value?: object): void {
    if (value) {
      setCookie(this.context, key, JSON.stringify(value), {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/' // *
      })
    } else {
      destroyCookie(this.context, key)
    }
  }

  get(key: string): any {
    const cookies = parseCookies(this.context)
    const token = cookies[key]
    return token ? JSON.parse(token) : undefined
  }
}
