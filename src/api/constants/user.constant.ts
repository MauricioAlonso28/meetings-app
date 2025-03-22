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

export interface AuthResetPassword extends AuthSignIn {
  token: string
}

export interface AuthId {
  id: string
}

export interface AuthGetProfileByEmail extends AuthId, UserEmail {
  // email: string
  role: UserRole
}

export interface AuthCompleteName extends AuthId {
  name?: string
  lastname?: string
}

export interface AuthGetProfile extends UserEmail {
  // email: string
  name: string
  lastname: string
  createdAt: Date
  role: UserRole
}

export interface AuthSignIn extends UserEmail, UserPassword {}
export interface AuthChangePassword extends UserEmail, UserPassword {}
export interface DeleteAccountCredentials extends AuthResetPassword {}



