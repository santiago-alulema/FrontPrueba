import { CancelToken, ResponseType } from "axios";

export interface IHttpClientRequestParams<T = any> {
    url: string
    requiresToken: boolean
    customToken?: string | undefined | null
    payload?: T,
    responseType?: ResponseType,
    cancelToken?: CancelToken,
}
