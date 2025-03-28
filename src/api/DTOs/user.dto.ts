import { UserRole } from '@/database/enums/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, IsUUID, Matches, MaxLength, MinLength } from 'class-validator'

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
    message: "User id must be uuid"
  })
  id: string;
}

export class AuthCompleteNameDto {
  @ApiProperty({
    description: 'The name must be string',
    example: "John"
  })
  @IsString()
  @MinLength(3, {
    message: 'Name must be at least 3 characters long'
  })
  @MaxLength(50, {
    message: 'Name must be at most 50 characters long'
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The lastname must be string',
    example: "Doe"
  })
  @IsString()
  @MinLength(3, {
    message: 'Lastname must be at least 3 characters long'
  })
  @MaxLength(50, {
    message: 'Lastname must be at most 50 characters long'
  })
  @IsOptional()
  lastname: string;
}


export class DeleteAccountRequestDto {
  @ApiProperty({
    description: 'The token is unique',
    example: "dpJhwGcrOiJIUzI1NiIsIn"
  })
  @IsString()
  @MinLength(10, { message: 'Token must be at least 20 characters long'})
  token: string

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