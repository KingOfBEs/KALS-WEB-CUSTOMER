export interface LoginUser {
  id: string;
  userName: string;
  phoneNumber: string;
  fullName: string;
  token: string;
  refreshToken: string;
}

export type LoginUserResponse = Omit<LoginUser, "id">;
export type RegisterUserResponse = LoginUserResponse;
