import { AuthEmailService } from "@/email/services/auth_email.service";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Job } from "bullmq";

@Processor("email-queue")
@Injectable()
export class EmailQueueProcess extends WorkerHost{
  constructor(
    private readonly emailService: AuthEmailService
  ) {
    super()
  }

  async process(job: Job): Promise<void> {
    const { name, data } = job

    if (name === "signed-up-email") {
      await this.emailService.signedUpMail(data.email)
    } else if (name === "signed-in-email") {
      await this.emailService.signedInMail(data.email)
    } else if (name == "updated-password-email") {
      await this.emailService.updatedPasswordMail(data.email)
    } else if (name == "enabled-email") {
      await this.emailService.enabledMail(data.email)
    } else if (name == "deleted-account-email") {
      await this.emailService.deletedAccountMail(data.email)
    }
  }
}