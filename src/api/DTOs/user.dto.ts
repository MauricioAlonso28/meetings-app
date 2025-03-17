import { UserRole } from '@/database/enums/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsStrongPassword, IsUUID, MaxLength, MinLength, NotEquals } from 'class-validator'

export class AuthSignUpDto {
  @ApiProperty({
    description: 'The email is unique',
    example: "test01@gmail.com"
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(60, { message: 'Email must not exceed 60 characters' })
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
  @MaxLength(60, { message: 'Email must not exceed 60 characters' })
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

/******************************************/

export class AuthEmailDto {
  @ApiProperty({
    description: 'The email is unique',
    example: "test01@gmail.com"
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(60, { message: 'Email must not exceed 60 characters' })
  email: string;
}

export class AuthResetPasswordDto {
  @ApiProperty({
    description: 'The token is unique',
    example: "dpJhwGcrOiJIUzI1NiIsIn"
  })
  @IsString()
  @MinLength(10, { message: 'Token must be at least 20 characters long'})
  token: string

  @ApiProperty({
    description: 'The email is unique',
    example: "test01@gmail.com"
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(60, { message: 'Email must not exceed 60 characters' })
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
  password: string
}

/******************************************/

export class AuthChangePasswordDto { 
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

export class AuthIdDto {
  @ApiProperty({
    description: 'The id must be uuid v4',
    example: "Tashja776-dadjaduja-3242dada-23242fcsfs"
  })
  @IsUUID(4, {
    message: "Note id must be uuid"
  })
  id: string;
}
