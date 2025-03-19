import { Token } from "@/database/entities/token.entity";
import { User } from "@/database/entities/user.entity";
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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super()
  }

  async process(job: Job): Promise<void> {
    const { name, data } = job

    if (name === "auth-token-removed") {
      await this.removeToken(data.token)
    } else if (name === "auth-delete-profile") {
      await this.deleteDetailsProfile(data.id)
    }
  }

  async removeToken(token: string): Promise<void>{
    await this.tokenRepository.delete({ token })
  }

  async deleteDetailsProfile(id: string): Promise<void> {
    await this.userRepository.update({ id }, {
      email: `deleted_${id}@deleted.com`,
      password: "",
      name: "",
      lastname: ""
    })
  }
}