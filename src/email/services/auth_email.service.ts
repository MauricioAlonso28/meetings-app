import { User } from "@/database/entities/user.entity";
import { TransportType } from "@nestjs-modules/mailer/dist/interfaces/mailer-options.interface";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { createTransport, Transporter } from "nodemailer";
import Mail = require("nodemailer/lib/mailer");
import { Repository } from "typeorm";
import { signedUpMailTemplate } from "../templates/auth_email.template";

@Injectable()
export class AuthEmailService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    @Inject("EMAIL_TRANSPORT") private readonly nodemailerTransport: Transporter,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(options: Mail.Options): Promise<void>{
    return this.nodemailerTransport.sendMail(options);
  }

  async signedUpMail(email: string): Promise<void>{
    const user = await this.authRepository.findOne({
      where: { email }
    })

    if (!user) throw new Error("The user doesn't exist")
    
    const template = await signedUpMailTemplate()

    return this.sendMail({
      from: this.configService.get<any>('EMAIL_USER'),
      to: email,
      subject: "Welcome to Mundsoh!",
      html: template
    })
  }
}