import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { ExtendedRequest } from "../constants/config.interface";
import { Response } from 'express'
import { CreateProfessionalProfileDto, UpdateProfessionalDto } from "../DTOs/professional.dto";
import { handleError } from "../utils/error-handler.util";
import { ProfessionalService } from "../services/professional.service";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { changeAndCompare } from "../utils/reusable-functions";

@Controller("professional")
export class ProfessionalController {
  constructor(
    private readonly professionalService: ProfessionalService
  ) { }
  
  @ApiOperation({
    summary: "Create a professional",
  })
  @ApiCreatedResponse({
    description: "Professional created successfully",
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("create")
  async postProfessional(
    @Req() req: ExtendedRequest,
    @Res() res: Response,
    @Body() body: CreateProfessionalProfileDto
  ) {
    try {
      const ageFormatted = changeAndCompare(body.age)
      
      if(ageFormatted < 18) throw new Error("Must be older or equal than 18")

      await this.professionalService.postProfessionalService({
        userId: req.user.sub,
        ...body
      })

      return res.send({
        message: "Professional created successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }

  @ApiOperation({
    summary: "Get professional profile",
  })
  @ApiOkResponse({
    description: "Professional profile retrieved successfully",
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @HttpCode(HttpStatus.OK)
  @Get("profile")
  async getProfessionalProfile(
    @Req() req: ExtendedRequest,
    @Res() res: Response
  ) {
    try {
      const response = await this.professionalService.getProfessionalProfileService({
        userId: req.user.sub,
      })

      return res.json(response)
    } catch (error) {
      handleError(error, res)
    }
  }

  @ApiOperation({
    summary: "Update professional user profile",
  })
  @ApiOkResponse({
    description: "Professional profile updated successfully",
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @HttpCode(HttpStatus.OK)
  @Put("update-profile")
  async updateProfessionalProfile(
    @Req() req: ExtendedRequest,
    @Res() res: Response,
    @Body() body: UpdateProfessionalDto
  ) {
    try {
      await this.professionalService.updateProfessionalProfileService({
        userId: req.user.sub,
        ...body
      })

      return res.send({
        message: "Professional profile updated successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }

  @Put("enable-visibility")
  async enableVisibility(
    @Req() req: ExtendedRequest,
    @Res() res: Response,
  ) {
    try {
      await this.professionalService.enableVisibilityService({
        userId: req.user.sub
      })

      return res.send({
        message: "Visibility enabled successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }
}