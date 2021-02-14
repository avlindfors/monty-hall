import { useState } from "react";
import axios, { AxiosError, AxiosResponse, Method } from "axios";
import ErrorObject from "../api/ErrorObject";

interface UseAxiosType {
  isLoading: boolean;
  error: ErrorObject | undefined;
  response: any | undefined;
  performCall: (data?: any) => void;
}

interface AxiosRequestProps {
  url: string;
  method: Method;
  onResponse?: (response: any | undefined) => void;
  onError?: (error: any | undefined) => void;
  initialLoadingState?: boolean;
  overrideBaseUrl?: boolean;
}

const API_HOST = process.env.REACT_APP_API_HOST as string;
const API_PORT = process.env.REACT_APP_API_PORT as string;
const HOST_PORT = `${API_HOST}:${API_PORT}`;
// use CRA proxy
const isProduction: boolean = process.env.NODE_ENV === "production";
const BASE_URL = isProduction ? HOST_PORT : "";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  timeoutErrorMessage:
    "Could not connect to server before timeout. Please try again.",
});

function useAxios({
  url,
  method,
  initialLoadingState = false,
  onResponse,
  onError,
  overrideBaseUrl,
}: AxiosRequestProps): UseAxiosType {
  const [isLoading, setIsLoading] = useState<boolean>(initialLoadingState);
  const [error, setError] = useState<ErrorObject | undefined>(undefined);
  const [response, setResponse] = useState<any | undefined>(undefined);

  async function performCall(data: any | undefined) {
    setIsLoading(true);
    setError(undefined);
    axiosConfig
      .request({
        baseURL: overrideBaseUrl ? HOST_PORT : BASE_URL,
        url: url,
        method: method,
        data: data,
        responseType: "json",
      })
      .then((response: AxiosResponse) => {
        const responseData = response.data;
        setResponse(responseData);
        if (onResponse !== undefined) {
          onResponse(responseData);
        }
      })
      .catch((error: AxiosError) => {
        if (error.request !== undefined) {
          const errorObject: ErrorObject = {
            errorCode: error.code,
            description: error.message,
          };
          console.error(errorObject)
          setError(errorObject);
        } else if (error.response !== undefined) {
          const errorObject = error.response?.data as ErrorObject;
          console.error(errorObject)
          setError(errorObject);
        } else {
          const errorObject: ErrorObject = {
            errorCode: error.code,
            description: error.message,
          };
          setError(errorObject);
        }
        if (onError !== undefined) {
          onError(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return { isLoading, error, response, performCall } as UseAxiosType;
}

export default useAxios;
