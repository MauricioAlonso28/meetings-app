import { User } from "@/database/entities/user.entity";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "@/api/controllers/auth.controller";
import { AuthService } from "@/api/services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { Professional } from "@/database/entities/professional.entity";
import { Customer } from "@/database/entities/customer.entity";
import { AuthLoggedInMiddleware, AuthNotLoggedInMiddleware, BannedUserMiddleware } from "../middlewares/auth.middleware";
import { ConfigService } from "@nestjs/config";
import { EmailQueueModule } from "@/jobs/modules/email-queue.module";
import { EmailModule } from "@/email/email.module";
import { Token } from "@/database/entities/token.entity";
import { AuthQueueModule } from "@/jobs/modules/auth-queue.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Professional,
      Customer,
      Token
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => { 
        return {
          global: true,
          secret: configService.get<string>("JWT_VERIFICATION_TOKEN_SECRET"),
          signOptions: {
            expiresIn: configService.get<string>("JWT_VERIFICATION_TOKEN_EXPIRATION_TIME")
          }
        }
      }
    }),
    EmailQueueModule,
    AuthQueueModule,
    EmailModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
  ]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer
      .apply(AuthLoggedInMiddleware)
      .forRoutes(
        { path: "auth/signup", method: RequestMethod.POST },
        { path: "auth/signin", method: RequestMethod.POST },
        { path: "auth/forgot-password", method: RequestMethod.PUT },
        { path: "auth/reset-password", method: RequestMethod.PUT }
      );
    consumer
      .apply(AuthNotLoggedInMiddleware, BannedUserMiddleware)
      .forRoutes(
        { path: "auth/profile", method: RequestMethod.GET },
        { path: "auth/update-password/:id", method: RequestMethod.PUT },
        { path: "auth/disable", method: RequestMethod.PUT },
        { path: "auth/enable", method: RequestMethod.PUT },
        { path: "auth/signout", method: RequestMethod.POST },
        { path: "auth/delete-account-link", method: RequestMethod.POST },
        { path: "auth/delete-account", method: RequestMethod.DELETE },
      )
  }
};