export interface User {
  username: string | null;
  userid: number | null;
  token: string | null;
}

export interface LoginInfo {
  username: string;
  password: string;
}