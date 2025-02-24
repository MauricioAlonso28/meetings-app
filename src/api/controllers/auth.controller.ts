import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "@/api/services/auth.service";
import { handleError } from "@/api/utils/error-handler.util";
import { UserAuthDto } from "@/api/DTOs/user.dto";
import { Response } from 'express'
import { ExtendedRequest } from "../constants/config.interface";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() authDto: UserAuthDto,
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

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() authDto: UserAuthDto,
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