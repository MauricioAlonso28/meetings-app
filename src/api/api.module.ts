import { Module } from "@nestjs/common";
import { AuthModule } from "@/api/modules/auth.module";
import { ProfessionalModule } from "./modules/professional.module";

@Module({
  imports: [
    AuthModule,
    ProfessionalModule
  ]
})

export class ApiModule {}