import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from '@/api/api.module';
import { EmailModule } from '@/email/email.module';
import { BullModule } from '@nestjs/bullmq';

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
    ApiModule,
    DatabaseModule,
    EmailModule
  ],
})
  
export class AppModule {}