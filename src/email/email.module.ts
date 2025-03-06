import { Module } from "@nestjs/common";
import { AuthEmailService } from "./services/auth_email.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/database/entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ])
  ],
  providers: [
    AuthEmailService,
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
    AuthEmailService
  ]
})
export class EmailModule {};