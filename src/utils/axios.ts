import axios from "axios";
import { toast } from "react-toastify";
import { BaseError } from "../types/response.type";
import { HOST_API } from "./config";

export const handleError = (error: any): BaseError => {
  let handledError: BaseError;
  if (error.response) {
    const { status, data } = error.response;

    if (data && data.StatusCode && data.Error && data.TimeStamp) {
      handledError = {
        StatusCode: data.StatusCode,
        Error: data.Error,
        TimeStamp: data.TimeStamp,
      };
    } else {
      handledError = {
        StatusCode: status,
        Error: "An unexpected error occurred.",
        TimeStamp: new Date().toISOString(),
      };
    }
  } else if (error.request) {
    handledError = {
      StatusCode: 0,
      Error: "Network error: No response received.",
      TimeStamp: new Date().toISOString(),
    };
  } else {
    handledError = {
      StatusCode: 0,
      Error: "An error occurred while setting up the request.",
      TimeStamp: new Date().toISOString(),
    };
  }

  // Show toast notification with the error message
  toast.error(handledError.Error);

  return handledError;
};

export const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const handledError = handleError(error);
    return Promise.reject(handledError);
  }
);

const parseParams = (params: any) => {
  const keys = Object.keys(params);
  let options = "";

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === "object";
    const isParamTypeArray =
      isParamTypeObject &&
      Array.isArray(params[key]) &&
      params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element: any) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

const request = axios.create({
  baseURL: HOST_API,
  paramsSerializer: parseParams,
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Access-Control-Allow-Origin": "*",
  },
});

request.interceptors.request.use((options) => {
  const { method, data } = options;

  if (method === "put" || method === "post" || method === "patch") {
    if (data instanceof FormData) {
      // Nếu body là FormData, đặt Content-Type là multipart/form-data
      Object.assign(options.headers!, {
        "Content-Type": "multipart/form-data",
      });
    } else {
      // Nếu không, giữ Content-Type là application/json
      Object.assign(options.headers!, {
        "Content-Type": "application/json;charset=UTF-8",
      });
    }
  }

  return options;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    const handledError = handleError(error);
    return Promise.reject(handledError);
  }
);

export default request;
