import { ProfessionalVisibility } from "@/database/enums/user.enum";
import { IsDate, IsEnum, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateProfessionalProfileDto {
  @IsOptional()
  @IsDate({ 
    message: "The date of birth must be a valid date",
  })
  age: Date

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

  @IsOptional()
  @IsUrl({}, {
    message: "The image must be an Url"
  })
  @MinLength(10, {
    message: "The image url must be at least 10 characters long",
  })
  image: string

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

export class VerificationVisibilityDto {
  @IsEnum(ProfessionalVisibility)
  visibility: ProfessionalVisibility
}