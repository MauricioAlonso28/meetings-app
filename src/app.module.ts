import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from '@/api/api.module';
import { EmailModule } from '@/email/email.module';
import { BullModule } from '@nestjs/bullmq';
import { ScheduleModule } from '@nestjs/schedule';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => { 
        return {
          connection: {
            host: configService.get<string>("REDIS_HOST"),
            port: configService.get<number>("REDIS_PORT")
          }
        }
      }
    }),
    ScheduleModule.forRoot(),
    ApiModule,
    DatabaseModule,
    EmailModule,
    JobsModule
  ],
})
  
export class AppModule {}