import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { AuthService } from "@/api/services/auth.service";
import { handleError } from "@/api/utils/error-handler.util";
import { AuthChangePasswordDto, AuthCompleteNameDto, AuthEmailDto, AuthIdDto, AuthResetPasswordDto, AuthSignInDto, AuthSignUpDto, DeleteAccountRequestDto } from "@/api/DTOs/user.dto";
import { Response } from 'express'
import { ExtendedRequest } from "../constants/config.interface";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { EmailQueueProcessor } from "@/jobs/services/email-queue.service";
import { AuthQueueProcessor } from "@/jobs/services/auth-queue.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailQueue: EmailQueueProcessor,
    private readonly authQueue: AuthQueueProcessor
  ) { }

  @ApiOperation({
    summary: "Sign up user",
  })
  @ApiCreatedResponse({
    description: "User signed up successfully",
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

      await this.emailQueue.signedUpEmailQueue(authDto.email)

      return res.send({
        message: "User registered successfully!",
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

      await this.emailQueue.signedInEmailQueue(authDto.email)

      return res.send({
        message: "User logged in successfully!",
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

  /******************************/
  
  @ApiOperation({
    summary: "User forgot password",
  })
  @ApiOkResponse({
    description: "Email sent to reset password successfully",
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @HttpCode(HttpStatus.OK)
  @Put('forgot-password')
  async forgotPassword(
    @Res() res: Response,
    @Body() body: AuthEmailDto,
  ) { 
    try {
      await this.authService.forgotPasswordService({ email: body.email })

      return res.send({
        message: "Password reset email sent successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }

  @ApiOperation({
    summary: "User reset password",
  })
  @ApiOkResponse({
    description: "Password reset successfully",
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @HttpCode(HttpStatus.OK)
  @Put('reset-password')
  async resetPassword(
    @Res() res: Response,
    @Body() body: AuthResetPasswordDto
  ) {
    try {
      await this.authService.resetPasswordService({
        email: body.email,
        password: body.password,
        token: body.token
      })

      await this.emailQueue.updatedPasswordEmailQueue(body.email)

      await this.authQueue.tokenRemoved(body.token)

      return res.send({
        message: "Password reset successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }

  /******************************/

  @ApiOperation({
    summary: "User updated password",
  })
  @ApiOkResponse({
    description: "Password updated successfully",
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @HttpCode(HttpStatus.OK)
  @Put('update-password/:id')
  async changePassword(
    @Res() res: Response,
    @Req() req: ExtendedRequest,
    @Body() body: AuthChangePasswordDto,
    @Param() param: AuthIdDto
  ) {
    try {
      if (param.id !== req.user.sub) throw new Error("Unauthorized: You can only change your own password")
      
      await this.authService.changePasswordService({
        email: req.user.email,
        password: body.password,
      })

      await this.emailQueue.updatedPasswordEmailQueue(req.user.email)

      return res.send({
        message: "Password updated successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }

  @ApiOperation({
    summary: "User updated complete name",
  })
  @ApiOkResponse({
    description: "Complete name updated successfully",
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @HttpCode(HttpStatus.OK)
  @Put("update-complete-name")
  async updateCompleteName(
    @Res() res: Response,
    @Req() req: ExtendedRequest,
    @Body() body: AuthCompleteNameDto
  ) { 
    try {
      await this.authService.updateCompleteNameService({
        ...body,
        id: req.user.sub
      })

      return res.send({
        message: "Complete name updated successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }

  /******************************/

  @ApiOperation({
    summary: "Disable user account",
  })
  @ApiOkResponse({
    description: "User profile disabled successfully",
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @HttpCode(HttpStatus.OK)
  @Put("disable")
  async disableProfile(
    @Res() res: Response,
    @Req() req: ExtendedRequest
  ) {
    try {
      await this.authService.disableProfileService({
        email: req.user.email
      })

      return res.send({
        message: "User account disabled successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }

  @ApiOperation({
    summary: "Enable user account",
  })
  @ApiOkResponse({
    description: "User profile enabled successfully",
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @HttpCode(HttpStatus.OK)
  @Put("enable")
  async enableProfile(
    @Res() res: Response,
    @Req() req: ExtendedRequest
  ) {
    try {
      await this.authService.enableProfileService({
        email: req.user.email
      })

      await this.emailQueue.enabledEmailQueue(req.user.email)

      return res.send({
        message: "User account enabled successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }

  /******************************/

  @ApiOperation({
    summary: "Get user profile",
  })
  @ApiOkResponse({
    description: "User profile retrieved successfully",
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @HttpCode(HttpStatus.OK)
  @Get("profile/:email")
  async getProfileUser(
    @Res() res: Response,
    @Req() req: ExtendedRequest,
    @Param() param: AuthEmailDto
  ) {
    try {
      const response = await this.authService.getProfileUserService({
        id: req.user.sub,
        email: param.email,
        role: req.user.role
      })

      return res.json(response)
    } catch (error) {
      handleError(error, res)
    }
  }

  /******************************/

  @ApiOperation({
    summary: "Send account deletion link",
  })
  @ApiOkResponse({
    description: "Account deletion link sent successfully",
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @HttpCode(HttpStatus.OK)
  @Delete("delete-account-link")
  async deleteAccountSendLink(
    @Res() res: Response,
    @Req() req: ExtendedRequest
  ) {
    try {
      await this.authService.deleteAccountSendLinkService({ email: req.user.email })

      return res.send({
        message: "Account verification email sent successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }

  @ApiOperation({
    summary: "Permanently delete user account",
  })
  @ApiNoContentResponse({
    description: "User account deleted successfully",
  })
  @ApiBadRequestResponse({
    description: "Invalid request",
  })
  @HttpCode(HttpStatus.OK)
  @Delete("delete-account")
  async deleteAccount(
    @Res() res: Response,
    @Req() req: ExtendedRequest,
    @Body() body: DeleteAccountRequestDto
  ) {
    try {
      await this.authService.deleteAccountService({
        email: req.user.email,
        password: body.password,
        token: body.token
      })

      await this.emailQueue.deletedAccountEmailQueue(req.user.email)

      await this.authQueue.tokenRemoved(body.token)

      await this.authQueue.deleteDetailsProfile(req.user.sub)

      return res.send({
        message: "Account deleted successfully",
      })
    } catch (error) {
      handleError(error, res)
    }
  }
}