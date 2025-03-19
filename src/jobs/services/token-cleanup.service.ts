import { Token } from "@/database/entities/token.entity";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";

@Injectable()
export class TokenCleanupService { 
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) { }
  
  @Cron(CronExpression.EVERY_DAY_AT_3AM, {
    name: "expired-token"
  })
  async removedExpiredTokens() { 
    try {
      const nowDate = new Date()
      const { affected } = await this.tokenRepository.delete({ expiresAt: LessThan(nowDate)})
  
      console.log(`[${new Date().toISOString()}] ✅ Expired tokens removed: ${affected}`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}]`)
    }
  }
}