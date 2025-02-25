import { UserRole } from "@/database/enums/user.enum";

export type UserEmail = {
  email: string;
}

export type UserPassword = {
  password: string;
}

export interface AuthSignUp extends UserEmail, UserPassword{
  role: UserRole
}

export interface AuthSignIn extends UserEmail, UserPassword {}