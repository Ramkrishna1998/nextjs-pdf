/**
 * Generic Response Type from Server
 * Replace this with your reponse and use it in api type
 */

export interface IResponseBody<T> {
  payload: T;
  status: number;
  message?: string;
}
export interface IQueryOptions {
  refresh?: boolean;
}

/**
 * Usage
 * 
 * public static async signup(signupParams: unknown): Promise<IResponseBody<IUser>> {
    try {
      const res = await axios.httpPost(signupParams, `${API_URL}${this.base}signup`);
      Logger.debug('AuthApi.signup() ', res);
      return res as IResponseBody<IUser>;
    } catch (err: unknown) {
      Logger.error('AuthApi.signup() ', err);
      return {} as IResponseBody<IUser>;
    }
  }
 */
