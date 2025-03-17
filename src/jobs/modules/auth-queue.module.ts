import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { AuthQueueProcessor } from "../services/auth-queue.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Token } from "@/database/entities/token.entity";
import { AuthQueueProcess } from "../process/auth-queue.worker";

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'auth-queue',
    }),
    TypeOrmModule.forFeature([
      Token
    ])
  ],
  providers: [
    AuthQueueProcessor,
    AuthQueueProcess
  ],
  exports: [
    AuthQueueProcessor
  ]
})
export class AuthQueueModule { }