import { Professional } from "@/database/entities/professional.entity";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfessionalController } from "../controllers/professional.controller";
import { ProfessionalService } from "../services/professional.service";
import { AuthExistUser, AuthNotLoggedInMiddleware, BannedUserMiddleware } from "../middlewares/auth.middleware";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "@/database/entities/user.entity";
import { ProfessionalQueueModule } from "@/jobs/modules/professional-queue.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Professional
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
    ProfessionalQueueModule
  ],
  controllers: [ProfessionalController],
  providers: [ProfessionalService],
})
export class ProfessionalModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthNotLoggedInMiddleware, AuthExistUser , BannedUserMiddleware)
      .forRoutes(ProfessionalController);
  }
}