import { Module } from "@nestjs/common";
import { AuthModule } from "@/api/modules/auth.module";
import { ProfessionalModule } from "./modules/professional.module";
import { ServiceModule } from "./modules/service.module";

@Module({
  imports: [
    AuthModule,
    ProfessionalModule,
    ServiceModule
  ]
})

export class ApiModule {}