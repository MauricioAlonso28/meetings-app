import { User } from "@/database/entities/user.entity";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "@/api/controllers/auth.controller";
import { AuthService } from "@/api/services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { DEFAULT_KEY } from "@/api/utils/default-key";
import { Professional } from "@/database/entities/professional.entity";
import { Customer } from "@/database/entities/customer.entity";
import { AuthLoggedInMiddleware, AuthNotLoggedInMiddleware } from "../middlewares/auth.middleware";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Professional,
      Customer
    ]),
    JwtModule.register({
      global: true,
      secret: DEFAULT_KEY,
      signOptions: {
        expiresIn: "90d",
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
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