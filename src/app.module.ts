import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './app.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from './validation.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      validate: AppConfig.validate

    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppConfig,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe
    }
  ],
  exports: [AppConfig]
})
export class AppModule { }
