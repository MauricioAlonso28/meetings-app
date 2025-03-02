import { AuthEmailService } from "@/email/services/auth_email.service";
import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class EmailQueueService { 
  constructor(
    @InjectQueue('email-queue')
    private readonly emailQueue: Queue,
  ) { }
  
  async signedUpEmailQueue(email: string) {
    await this.emailQueue.add(
      'signed-up-email',
      { email },
      {
        delay: 10000,
        lifo: true
      }
    )

    console.log("Job added to queue")
  }
}