import { Token } from "@/database/entities/token.entity";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "bullmq";
import { Repository } from "typeorm";

@Processor("auth-queue")
@Injectable()
export class AuthQueueProcess extends WorkerHost { 
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {
    super()
  }

  async process(job: Job): Promise<void> {
    const { name, data } = job

    if (name === "auth-token-removed") {
      await this.removeTokenAfterUpdate(data.token)
    }
  }

  async removeTokenAfterUpdate(token: string): Promise<void>{
    await this.tokenRepository.delete({ token })
  }
}