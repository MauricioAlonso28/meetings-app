import { Professional } from "@/database/entities/professional.entity";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Transporter } from "nodemailer";
import Mail = require("nodemailer/lib/mailer");
import { Repository } from "typeorm";
import { enabledVisibilityMailTemplate } from "../templates/professional_email.template";

@Injectable()
export class ProfessionalEmailService {
  private emailFrom

  constructor(
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
    @Inject("EMAIL_TRANSPORT")
    private readonly nodemailerTransport: Transporter,
    private readonly configService: ConfigService,
  ) {
    const emailFromVariable = this.configService.get<string>('EMAIL_USER')

    this.emailFrom = emailFromVariable
  }
  
  async sendMail(options: Mail.Options): Promise<void>{
    return this.nodemailerTransport.sendMail(options);
  }

  async enabledVisibilityMail(email: string, completedName: string): Promise<void> {
    if(!this.emailFrom) return

    const template = await enabledVisibilityMailTemplate(
      this.emailFrom,
      completedName
    )

    return this.sendMail({
      from: this.emailFrom,
      to: email,
      subject: "Your profile is public",
      html: template
    })
  }
}