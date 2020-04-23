export interface UserFilter {
  email: string;
  fullname: string;
}

export interface Account {
  email: string;
  fullname: string;
  accessToken: string;
  refreshToken: string;
}
