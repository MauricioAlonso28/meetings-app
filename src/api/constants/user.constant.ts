import { UserRole } from "@/database/enums/user.enum";

export type UserEmail = {
  email: string;
}

export type UserPassword = {
  password: string;
}

export interface AuthSignUp extends UserEmail, UserPassword {
  role: UserRole
}

export interface AuthSignIn extends UserEmail, UserPassword { }
export interface AuthChangePassword extends UserEmail, UserPassword { }

export interface AuthResetPassword extends AuthSignIn {
  token: string
}