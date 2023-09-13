export interface UserCredential {
  iat: number;
  exp: number;
  roles: string[];
  id: number;
  email: string;
}
