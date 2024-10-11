import { LoginValues } from "../pages/auth/LoginForm/LoginForm";
import { RegisterValues } from "../pages/auth/RegisterForm/RegisterForm";
import {
  LoginUserResponse,
  RegisterUserResponse,
  ResetPasswordRequest,
} from "../types/auth.type";
import { axiosInstance } from "../utils/axios";
import { API_SUFFIX, generateAPI } from "./utils.api";

export const authApi = {
  login: (data: LoginValues) =>
    axiosInstance.post<LoginUserResponse>(`${API_SUFFIX.AUTH_API.LOGIN}`, data),
  register: (data: Omit<RegisterValues, "confirmPassword">) =>
    axiosInstance.post<RegisterUserResponse>(
      `${API_SUFFIX.AUTH_API.REGISTER}`,
      data
    ),
  sendSMS: (phoneNumber: string) =>
    axiosInstance.post(`${API_SUFFIX.AUTH_API.OTP}`, { phoneNumber }),
  resetPassword: (resetPasswordRequest: ResetPasswordRequest) =>
    axiosInstance.patch(
      `${API_SUFFIX.AUTH_API.FORGET_PASSWORD}`,
      resetPasswordRequest
    ),
};
