import axios, { AxiosRequestConfig } from "axios";

export type ErrorType = {
  message: string;
  info?: object;
  status?: number;
};

export const fetcher = (url: string, headers?: AxiosRequestConfig['headers']) => (
  axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
  })
    .then(res => {
      return res.data
    })
    .catch(fetcherErrorHandler)
);

const fetcherErrorHandler = (error: any) => {
  let errorMessage: ErrorType = {
    message: `An error occurred while fetching the data.`,
  }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage.message = error.response.data?.message ?? '';
    errorMessage.info = error.response.data;
    errorMessage.status = error.response.status;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    errorMessage.info = error.request;
  } else {
    // Something happened in setting up the request that triggered an Error
  }

  throw errorMessage;
};