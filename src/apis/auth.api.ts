import { LoginValues } from "../pages/auth/LoginForm/LoginForm";
import { RegisterValues } from "../pages/auth/RegisterForm/RegisterForm";
import { LoginUserResponse, RegisterUserResponse } from "../types/auth.type";
import { axiosInstance } from "../utils/axios";
import { API_SUFFIX, generateAPI } from "./utils.api";

export const authApi = {
  login: (data: LoginValues) =>
    axiosInstance.post<LoginUserResponse>(`${API_SUFFIX.AUTH_API.LOGIN}`, data),
  register: (data: RegisterValues) =>
    axiosInstance.post<RegisterUserResponse>(
      `${API_SUFFIX.AUTH_API.REGISTER}`,
      data
    ),
  sendSMS: (phoneNumber: string) =>
    axiosInstance.post(`${API_SUFFIX.AUTH_API.OTP}`, { phoneNumber }),
};
