import { UserRole } from "@/database/enums/user.enum";

export type UserEmail = {
  email: string;
}

export type UserPassword = {
  password: string;
}

export interface AuthUser {
  email: string
  password: string
  role: UserRole
}