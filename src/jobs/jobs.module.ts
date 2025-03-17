import { Module } from "@nestjs/common";
import { TokenCleanupService } from "./services/token-cleanup.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Token } from "@/database/entities/token.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Token
    ])
  ],
  controllers: [],
  providers: [TokenCleanupService],
})
export class JobsModule {}