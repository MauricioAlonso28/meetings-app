import { Token } from "@/database/entities/token.entity";
import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";

@Injectable()
export class TokenCleanupService { 
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) { }
  
  @Cron("0 0 */1 * * *", {
    name: "expired-token"
  })
  async removedExpiredTokens() { 
    const nowDate = new Date()
    const tokensFound = await this.tokenRepository.delete({ expiresAt: LessThan(nowDate)})

    console.log("Expired tokens were removed: ", tokensFound.affected)
  }
}