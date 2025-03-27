import { Professional } from "@/database/entities/professional.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceController } from "../controllers/service.controller";
import { ServiceService } from "../services/service.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Professional
    ]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {};