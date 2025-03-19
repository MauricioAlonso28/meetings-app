import { Token } from "@/database/entities/token.entity";
import { User } from "@/database/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";

@Injectable()
export class TokenCleanupService { 
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  
  @Cron(CronExpression.EVERY_DAY_AT_3AM, {
    name: "expired-token"
  })
  async removeExpiredTokens() { 
    try {
      const nowDate = new Date()
      const { affected } = await this.tokenRepository.delete({ expiresAt: LessThan(nowDate)})
  
      console.log(`[${new Date().toISOString()}] ✅ Expired tokens removed: ${affected}`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}]`)
    }
  }

  @Cron(CronExpression.EVERY_YEAR)
  async removeDeletedAccounts() {
    try {
      const { affected } = await this.userRepository.delete({
        deleteAt: LessThan(new Date()), 
      });

      console.log(`[${new Date().toISOString()}] ✅ Deleted accounts removed: ${affected}`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] ❌ Error removing deleted accounts:`, error);
    }
  }
}