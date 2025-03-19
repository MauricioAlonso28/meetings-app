import { Module } from "@nestjs/common";
import { TokenCleanupService } from "./services/token-cleanup.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Token } from "@/database/entities/token.entity";
import { User } from "@/database/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Token,
      User
    ])
  ],
  controllers: [],
  providers: [TokenCleanupService],
})
export class JobsModule {}