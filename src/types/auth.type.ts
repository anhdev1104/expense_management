export interface IAccount {
  username?: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export interface IAuth {
  accessToken: string;
  data: object;
  expiresIn: string | number;
}
