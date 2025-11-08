export interface User {
  id: string;
  provider: string;
  email: string;
  username: string;
  displayName: string;
  createdAt: number;
}

export interface AuthResult {
  token: string;
  user: User;
}
