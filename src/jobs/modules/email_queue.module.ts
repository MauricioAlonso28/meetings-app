import { EmailModule } from "@/email/email.module";
import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { EmailQueueProcess } from "../process/email_queue.process";
import { EmailQueueService } from "../queues/email_queue.service";

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email-queue',
    }),
    EmailModule
  ],
  controllers: [],
  providers: [
    EmailQueueService,
    EmailQueueProcess
  ],
  exports: [
    EmailQueueService
  ]
})
export class EmailQueueModule {};