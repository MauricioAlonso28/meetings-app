import { UserRole } from "@/database/enums/user.enum";

export type UserEmail = {
  email: string;
}

export type UserPassword = {
  password: string;
}

export interface AuthSignUp extends UserEmail, UserPassword {
  role: UserRole,
}

export interface AuthResetPassword extends AuthSignIn {
  token: string
}

export interface AuthId {
  id: string
}

export interface AuthGetProfileById extends AuthId {
  role: UserRole
}

export interface AuthCompleteName extends AuthId {
  name?: string
  lastname?: string
}

export interface AuthGetProfile extends UserEmail {
  createdAt: Date
  role: UserRole
}

export interface AuthSignIn extends UserEmail, UserPassword {}
export interface AuthChangePassword extends UserEmail, UserPassword {}
export interface DeleteAccountCredentials extends AuthResetPassword {}



