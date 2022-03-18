import { IHttpClientRequestParams } from ".";

export interface IHttpClient {
    get<T>(parameters: IHttpClientRequestParams): Promise<T>
    post<T, R>(parameters: IHttpClientRequestParams<T>): Promise<R>
    postAsFormData<T, R>(parameters: IHttpClientRequestParams<T>): Promise<R>
    delete<T>(parameters: IHttpClientRequestParams<T>): Promise<T>
    put<T, R>(parameters: IHttpClientRequestParams<T>): Promise<R>
}
