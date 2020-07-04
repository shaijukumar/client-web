export interface IUser {
  username: string;
  displayName: string;
  Token: string;
  image?: string;
}

export interface IUserFormValues {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
}
