import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { EmailQueueProcessor } from "../services/email-queue.service";
import { EmailQueueProcess } from "../process/email-queue.worker";
import { EmailModule } from "@/email/email.module";

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email-queue',
    }),
    EmailModule
  ],
  providers: [
    EmailQueueProcessor,
    EmailQueueProcess
  ],
  exports: [
    EmailQueueProcessor
  ]
})
export class EmailQueueModule {}