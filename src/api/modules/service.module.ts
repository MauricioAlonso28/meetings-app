import { Professional } from "@/database/entities/professional.entity";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceController } from "../controllers/service.controller";
import { ServiceService } from "../services/service.service";
import { Service } from "@/database/entities/service.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthNotLoggedInMiddleware } from "../middlewares/auth.middleware";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Professional,
      Service
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
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer
      .apply(AuthNotLoggedInMiddleware)
      .forRoutes(ServiceController);
  }
};