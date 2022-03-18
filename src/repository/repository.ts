import axios, { AxiosRequestConfig } from "axios";
import { siteInfo } from "site";
import { IHttpClient, IHttpClientRequestParams } from "types/interfaces";
import { toFormData } from "utils";

axios.defaults.baseURL = "http://45.177.127.116:7707/api";
axios.defaults.timeout = 30000;

export class HttpClient implements IHttpClient {
  constructor() {
  }
  get<T>(parameters: IHttpClientRequestParams<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // extract the individual parameters
      const { url, requiresToken, customToken, responseType, cancelToken } = parameters

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {},
        responseType,
        cancelToken
      }

      // if API endpoint requires a token, we'll need to add a way to add this.
      if (requiresToken) {
        const token = customToken;
        options.headers.Authorization = `${siteInfo.API_AUTHORIZATION_PREFIX} ${token}`;
      }

      // finally execute the GET request with axios:
      axios
        .get(url, options)
        .then((response: any) => {
          resolve(response.data as T)
        })
        .catch((error: any) => {
          reject(errorResponseHandler(error));
        });

    })
  }
  post<T, R>(parameters: IHttpClientRequestParams<T>): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      const { url, payload, requiresToken, customToken } = parameters

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {},
      }

      // if API endpoint requires a token, we'll need to add a way to add this.
      if (requiresToken) {
        const token = customToken;
        options.headers.Authorization = `${siteInfo.API_AUTHORIZATION_PREFIX} ${token}`;
      }

      // finally execute the GET request with axios:
      axios
        .post(url, payload, options)
        .then((response: any) => {
          resolve(response.data as R)
        })
        .catch((error: any) => {
          reject(errorResponseHandler(error));
        });
    })
  }
  postAsFormData<T, R>(parameters: IHttpClientRequestParams<T>): Promise<R> {
    const { payload, ...restParams } = parameters
    const formData = toFormData(payload);
    const newParams: IHttpClientRequestParams<FormData> = {
      ...restParams,
      payload: formData,
    };
    return this.post<FormData, R>(newParams);
  }
  delete<T>(parameters: IHttpClientRequestParams<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // extract the individual parameters
      const { url, requiresToken, customToken } = parameters

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {},
      }

      // if API endpoint requires a token, we'll need to add a way to add this.
      if (requiresToken) {
        const token = customToken;
        options.headers.Authorization = `${siteInfo.API_AUTHORIZATION_PREFIX} ${token}`;
      }

      // finally execute the GET request with axios:
      axios
        .delete(url, options)
        .then((response: any) => {
          resolve(response.data as T)
        })
        .catch((error: any) => {
          reject(errorResponseHandler(error));
        });

    })
  }
  put<T, R>(parameters: IHttpClientRequestParams<T>): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      const { url, payload, requiresToken, customToken } = parameters

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {},
      }

      // if API endpoint requires a token, we'll need to add a way to add this.
      if (requiresToken) {
        const token = customToken;
        options.headers.Authorization = `${siteInfo.API_AUTHORIZATION_PREFIX} ${token}`;
      }

      // finally execute the GET request with axios:
      axios
        .put(url, payload, options)
        .then((response: any) => {
          resolve(response.data as R)
        })
        .catch((error: any) => {
          reject(errorResponseHandler(error));
        });
    })
  }
}

const errorResponseHandler = (error: any) => {
  const { response } = error;
  if (response) {
    if (response.status >= 500) {
      return `Ocurrió un error al realizar la operación (${response.status})`;
    } else {
      return response.data.title || response.data;
    }
  } else {
    return error.message;
  }
}

export const httpClient = new HttpClient()