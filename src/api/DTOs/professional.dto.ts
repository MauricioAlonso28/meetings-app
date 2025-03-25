import { ProfessionalVisibility } from "@/database/enums/user.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from "class-validator";

export class CreateProfessionalProfileDto {
  @ApiProperty({
    description: 'The name must be string',
    example: "John"
  })
  @MinLength(3, {
    message: 'Name must be at least 3 characters long'
  })
  @MaxLength(50, {
    message: 'Name must be at most 50 characters long'
  })
  @Matches(/^[A-Za-zÀ-ÿ]+$/, {
    message: 'Name must only contain letters, no spaces or numbers'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The lastname must be string',
    example: "Doe"
  })
  @MinLength(3, {
    message: 'Lastname must be at least 3 characters long'
  })
  @MaxLength(50, {
    message: 'Lastname must be at most 50 characters long'
  })
  @Matches(/^[A-Za-zÀ-ÿ]+$/, {
    message: 'Lastname must only contain letters, no spaces or numbers'
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'The date of birth must be a valid date',
    example: "1990-01-01"
  })
  @Type(() => Date)
  @IsDate({ 
    message: "The date of birth must be a valid date",
  })
  age: Date

  @ApiProperty({
    description: 'The description must be a string',
  })
  @IsOptional()
  @IsString({
    message: "The description must be a string",
  })
  @MaxLength(1000, {
    message: "The description must be less than 1000 characters",
  })
  @MinLength(250, {
    message: "The description must be at least 250 characters",
  })
  description: string
  
  @ApiProperty({
    description: 'The image must be an Url',
  })
  @IsOptional()
  @IsUrl({}, {
    message: "The image must be an Url"
  })
  @MinLength(10, {
    message: "The image url must be at least 10 characters long",
  })
  image: string

  @ApiProperty({
    description: 'The specialization must be a string',
  })
  @IsOptional()
  @IsString({
    message: "The specialization must be a string",
  })
  @MaxLength(40, {
    message: "The specialization must be less than 40 characters"   
  })
  @MinLength(3, {
    message: "The specialization must be more than 3 characters",
  })
  specialization: string

  @ApiProperty({
    description: 'The nationality must be a string',
  })
  @IsOptional()
  @IsString({
    message: "The nationality must be a string",
  })
  @MaxLength(40, {
    message: "The nationality must be less than 40 characters"   
  })
  @MinLength(3, {
    message: "The nationality must be more than 3 characters"
  })
  nationality: string
}

export class UpdateProfessionalDto {
  @ApiProperty({
    description: 'The name must be string',
    example: "John"
  })
  @MinLength(3, {
    message: 'Name must be at least 3 characters long'
  })
  @MaxLength(50, {
    message: 'Name must be at most 50 characters long'
  })
  @Matches(/^[A-Za-zÀ-ÿ]+$/, {
    message: 'Name must only contain letters, no spaces or numbers'
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The lastname must be string',
    example: "Doe"
  })
  @MinLength(3, {
    message: 'Lastname must be at least 3 characters long'
  })
  @MaxLength(50, {
    message: 'Lastname must be at most 50 characters long'
  })
  @Matches(/^[A-Za-zÀ-ÿ]+$/, {
    message: 'Lastname must only contain letters, no spaces or numbers'
  })
  @IsOptional()
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'The description must be a string',
  })
  @IsOptional()
  @IsString({
    message: "The description must be a string",
  })
  @MaxLength(1000, {
    message: "The description must be less than 1000 characters",
  })
  @MinLength(250, {
    message: "The description must be at least 250 characters",
  })
  description: string

  @ApiProperty({
    description: 'The image must be an Url',
  })
  @IsOptional()
  @IsUrl({}, {
    message: "The image must be an Url"
  })
  @MinLength(10, {
    message: "The image url must be at least 10 characters long",
  })
  image: string

  @ApiProperty({
    description: 'The specialization must be a string',
  })
  @IsOptional()
  @IsString({
    message: "The specialization must be a string",
  })
  @MaxLength(40, {
    message: "The specialization must be less than 40 characters"   
  })
  @MinLength(3, {
    message: "The specialization must be more than 3 characters",
  })
  specialization: string

  @ApiProperty({
    description: 'The nationality must be a string',
  })
  @IsOptional()
  @IsString({
    message: "The nationality must be a string",
  })
  @MaxLength(40, {
    message: "The nationality must be less than 40 characters"   
  })
  @MinLength(3, {
    message: "The nationality must be more than 3 characters"
  })
  nationality: string
}