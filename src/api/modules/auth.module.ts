import { User } from "@/database/entities/user.entity";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "@/api/controllers/auth.controller";
import { AuthService } from "@/api/services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { Professional } from "@/database/entities/professional.entity";
import { Customer } from "@/database/entities/customer.entity";
import { AuthLoggedInMiddleware, AuthNotLoggedInMiddleware } from "../middlewares/auth.middleware";
import { ConfigService } from "@nestjs/config";
import { EmailQueueModule } from "@/jobs/modules/email-queue.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Professional,
      Customer
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
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthNotLoggedInMiddleware
  ]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer
      .apply(AuthLoggedInMiddleware)
      .forRoutes(
        { path: "auth/signup", method: RequestMethod.POST },
        { path: "auth/signin", method: RequestMethod.POST },
      );
    consumer
      .apply(AuthNotLoggedInMiddleware)
      .forRoutes(
        { path: "auth/signout", method: RequestMethod.POST }
      )
  }
};