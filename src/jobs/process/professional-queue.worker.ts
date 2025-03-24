
import { ProfessionalEmailService } from "@/email/services/professional_email.service";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Job } from "bullmq";

@Processor("professional-queue")
@Injectable()
export class ProfessionalQueueProcess extends WorkerHost{ 
  constructor(
    private readonly emailService: ProfessionalEmailService
  ) {
    super()
  }

  async process(job: Job): Promise<void> {
    const { name, data } = job

    if (name === "professional-enable-queue") {
      await this.emailService.enabledVisibilityMail(
        data.email,
        data.completedName,
      )
    }
  }
}