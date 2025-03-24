import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ProfessionalQueueProcessor } from "../services/professional-queue.service";
import { ProfessionalQueueProcess } from "../process/professional-queue.worker";
import { EmailModule } from "@/email/email.module";

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'professional-queue',
    }),
    EmailModule
  ],
  providers: [
    ProfessionalQueueProcessor,
    ProfessionalQueueProcess
  ],
  exports: [
    ProfessionalQueueProcessor
  ]
})
export class ProfessionalQueueModule {}