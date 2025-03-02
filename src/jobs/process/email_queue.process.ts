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
    console.log(`Processing job: ${job.name}`, job.data);

    if (job.name === "signed-up-email") {
      await this.emailService.signedUpMail(job.data.email)
    }
  }
}