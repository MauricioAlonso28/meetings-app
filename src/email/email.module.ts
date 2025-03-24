import { Module } from "@nestjs/common";
import { AuthEmailService } from "./services/auth_email.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/database/entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import { JwtModule } from "@nestjs/jwt";
import { Token } from "@/database/entities/token.entity";
import { ProfessionalEmailService } from "./services/professional_email.service";
import { Professional } from "@/database/entities/professional.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Token,
      Professional
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => { 
        return {
          global: true,
          secret: configService.get<string>("JWT_EMAIL_TOKEN_SECRET"),
          signOptions: {
            expiresIn: configService.get<string>("JWT_EMAIL_TOKEN_EXPIRATION_TIME")
          }
        }
      }
    })
  ],
  providers: [
    AuthEmailService,
    ProfessionalEmailService,
    {
      provide: "EMAIL_TRANSPORT",
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: configService.get<string>("EMAIL_USER"),
            pass: configService.get<string>("EMAIL_PASSWORD"),
          },
        });
      }
    }
  ],
  exports: [
    AuthEmailService,
    ProfessionalEmailService
  ]
})
export class EmailModule {};