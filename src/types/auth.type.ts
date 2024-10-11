export interface LoginUser {
  id: string;
  username: string;
  phoneNumber: string;
  fullName: string;
  token: string;
  refreshToken: string;
}

export type LoginUserResponse = Omit<LoginUser, "id">;
export type RegisterUserResponse = LoginUserResponse;
export type UserProfile = Omit<LoginUser, "token" | "refreshToken" | "id">;
export type ResetPasswordRequest = {
  phoneNumber: string;
  otp: string;
  password: string;
};
