import { UserRole } from '@/database/enums/user.enum';
import { IsEmail, IsEnum, IsStrongPassword, MaxLength, NotEquals } from 'class-validator'

export class UserAuthDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(50, { message: 'Email must not exceed 40 characters' })
  email: string;

  @IsStrongPassword({
    minLength: 8,       
    minLowercase: 1,     
    minUppercase: 1,     
    minNumbers: 1,      
    minSymbols: 1,      
  }, {
    message: 'Password must be at least 8 characters long and include 2 uppercase letters, 2 lowercase letters, 2 numbers, and 1 symbol.'
  })
  password: string;

  @IsEnum(UserRole)
  role: UserRole
}