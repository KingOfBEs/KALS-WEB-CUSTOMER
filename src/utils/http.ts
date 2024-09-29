import axios, { AxiosInstance } from "axios";
import { getBaseUrl } from "./config";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: getBaseUrl(),
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

const http = new Http().instance;

export default http;
