import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "@/api/services/auth.service";
import { handleError } from "@/api/utils/error-handler.util";
import { UserAuthDto } from "@/api/DTOs/user.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('signup')
  async signUp(
    @Body() authDto: UserAuthDto,
    @Res() res: Response
  ) {
    try {
      
    } catch (error) {
      handleError(error)
    }
  }
}