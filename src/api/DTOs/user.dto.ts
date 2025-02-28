import { UserRole } from '@/database/enums/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsStrongPassword, MaxLength, NotEquals } from 'class-validator'

export class AuthSignUpDto {
  @ApiProperty({
    description: 'The email is unique',
    example: "test01@gmail.com"
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(40, { message: 'Email must not exceed 40 characters' })
  email: string;

  @ApiProperty({
    description: 'The password must be strong',
    example: "TesT01%%"
  })
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

  @ApiProperty({
    enum: UserRole,
    description: 'The user role',
    example: UserRole.CUSTOMER
  })
  @IsEnum(UserRole)
  role: UserRole
}

export class AuthSignInDto {
  @ApiProperty({
    description: 'The email is unique',
    example: "test01@gmail.com"
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(30, { message: 'Email must not exceed 30 characters' })
  email: string;

  @ApiProperty({
    description: 'The password must be strong',
    example: "TesT01%%"
  })
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