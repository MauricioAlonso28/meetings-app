import { UserRole } from '@/database/enums/user.enum';
import { IsEmail, IsEnum, IsStrongPassword, MaxLength, NotEquals } from 'class-validator'

export class AuthSignUpDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(50, { message: 'Email must not exceed 40 characters' })
  email: string;

  @IsStrongPassword({
    minLength: 8,       
    minLowercase: 2,     
    minUppercase: 2,     
    minNumbers: 2,      
    minSymbols: 1,      
  }, {
    message: 'Password must be at least 8 characters long and include 2 uppercase letters, 2 lowercase letters, 2 numbers, and 1 symbol.'
  })
  password: string;

  @IsEnum(UserRole)
  role: UserRole
}

export class AuthSignInDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(50, { message: 'Email must not exceed 40 characters' })
  email: string;

  @IsStrongPassword({
    minLength: 8,       
    minLowercase: 2,     
    minUppercase: 2,     
    minNumbers: 2,      
    minSymbols: 1,      
  }, {
    message: 'Password must be at least 8 characters long and include 2 uppercase letters, 2 lowercase letters, 2 numbers, and 1 symbol.'
  })
  password: string;
}