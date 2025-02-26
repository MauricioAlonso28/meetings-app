import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "@/api/services/auth.service";
import { handleError } from "@/api/utils/error-handler.util";
import { AuthSignInDto, AuthSignUpDto } from "@/api/DTOs/user.dto";
import { Response } from 'express'
import { ExtendedRequest } from "../constants/config.interface";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @ApiOperation({
    summary: "Sign up user",
  })
  @ApiCreatedResponse({
    description: "User signed up successfully",
    type: AuthSignUpDto
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() authDto: AuthSignUpDto,
    @Res() res: Response
  ) {
    try {
      const token = await this.authService.signUpService(authDto)
      
      res.cookie("token", token.access_token)

      return res.send({
        message: "User registered successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }

  @ApiOperation({
    summary: "Sign in user",
  })
  @ApiOkResponse({
    description: "User signed in successfully",
    type: AuthSignInDto
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() authDto: AuthSignInDto,
    @Res() res: Response
  ) {
    try {
      const token = await this.authService.signInService(authDto)

      res.cookie("token", token.access_token)

      return res.send({
        message: "User logged in successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }

  @ApiOperation({
    summary: "Sign out user",
  })
  @ApiOkResponse({
    description: "User signed out successfully",
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signOut(
    @Res() res: Response,
    @Req() req: ExtendedRequest
  ) {
    try {
      req.user = null
      res.clearCookie('token')

      return res.send({
        message: "User signed out successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }
}