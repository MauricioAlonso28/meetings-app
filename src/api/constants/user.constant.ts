import { UserRole } from "@/database/enums/user.enum";

export type UserEmail = {
  email: string;
}

export type UserPassword = {
  password: string;
}

export interface AuthSignUp extends UserEmail, UserPassword {
  role: UserRole,
  name: string;
  lastname: string
}

export interface AuthSignIn extends UserEmail, UserPassword {}
export interface AuthChangePassword extends UserEmail, UserPassword {}

export interface AuthResetPassword extends AuthSignIn {
  token: string
}

export interface DeleteAccountCredentials extends AuthResetPassword {}

export interface AuthId {
  id: string
}

export interface AuthGetProfileByEmail extends AuthId {
  email: string
  role: UserRole
}

export interface AuthCompleteName extends AuthId {
  name?: string
  lastname?: string
}

export interface AuthGetProfile {
  email: string
  name: string
  lastname: string
  createdAt: Date
  role: UserRole
}