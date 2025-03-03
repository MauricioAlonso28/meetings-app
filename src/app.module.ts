import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from '@/api/api.module';
import { EmailModule } from '@/email/email.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // BullModule.forRoot({
    //   connection: {
    //     host: '127.0.0.1',
    //     port: 6379,
    //   }
    // }),
    ApiModule,
    DatabaseModule,
    EmailModule
  ],
})
  
export class AppModule {}