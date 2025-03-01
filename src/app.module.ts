import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from '@/api/api.module';
import { EmailModule } from '@/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiModule,
    DatabaseModule,
    EmailModule
  ],
})
  
export class AppModule {}