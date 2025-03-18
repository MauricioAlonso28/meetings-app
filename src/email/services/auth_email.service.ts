import { User } from "@/database/entities/user.entity";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Transporter } from "nodemailer";
import Mail = require("nodemailer/lib/mailer");
import { Repository } from "typeorm";
import { enabledMailTemplate, sendResetPasswordLinkMailTemplate, signedInMailTemplate, signedUpMailTemplate, updatedPasswordMailTemplate } from "../templates/auth_email.template";
import { Token } from "@/database/entities/token.entity";

@Injectable()
export class AuthEmailService {
  private frontendUrl
  private emailFrom

  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly jwtService: JwtService,
    @Inject("EMAIL_TRANSPORT") private readonly nodemailerTransport: Transporter,
    private readonly configService: ConfigService,
  ) {
    const frontendUrlVariable = this.configService.get<string>("FRONTEND_URL")
    const emailFromVariable = this.configService.get<string>('EMAIL_USER')
    
    this.frontendUrl = frontendUrlVariable
    this.emailFrom = emailFromVariable
  }

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
      from: this.emailFrom,
      to: email,
      subject: "Welcome to Mundsoh!",
      html: template
    })
  }

  async signedInMail(email: string): Promise<void> {
    const user = await this.authRepository.findOne({
      where: { email }
    })
    
    if (!user) throw new Error("The user doesn't exist")

    const template = await signedInMailTemplate()
    
    return this.sendMail({
      from: this.emailFrom,
      to: email,
      subject: "Welcome again!",
      html: template
    })
  }

  /******************************/

  async sendResetPasswordLinkMail(email: string): Promise<void> {
    if (!this.frontendUrl) return

    const expiresAtCreate = new Date(Date.now() + 15 * 60 * 1000)

    const payload = {
      email,
      expiresAt: expiresAtCreate,
    }

    const newToken = this.tokenRepository.create({
      token: await this.jwtService.signAsync(payload),
      expiresAt: expiresAtCreate
    })

    const { token } = await this.tokenRepository.save(newToken)

    this.frontendUrl = `${this.frontendUrl}/reset-password/token?=${token}`

    const template = await sendResetPasswordLinkMailTemplate(this.frontendUrl)

    return this.sendMail({
      from: this.emailFrom,
      to: email,
      subject: "Reset your password",
      html: template
    })
  }

  async updatedPasswordMail(email: string): Promise<void> {
    if(!this.emailFrom) return

    const template = await updatedPasswordMailTemplate(this.emailFrom)

    return this.sendMail({
      from: this.emailFrom,
      to: email,
      subject: "Your password has been updated",
      html: template
    })
  }

  async enabledMail(email: string): Promise<void> {
    const template = await enabledMailTemplate()

    return this.sendMail({
      from: this.emailFrom,
      to: email,
      subject: "Your account was enabled",
      html: template
    })
  }
}