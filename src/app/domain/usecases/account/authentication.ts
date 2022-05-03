export interface Authentication {
  signIn: (params: Authentication.Params) => Promise<Authentication.Response>
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
  }

  export type Response = {
    accessToken: string
    accessTokenExpiresIn: number
    refreshToken: string
    refreshTokenExpiresIn: number
    tokenType: string
  }
}
