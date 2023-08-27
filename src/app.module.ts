import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { DatabaseModule } from './database.module';
import { MembersModule } from './members/members.module';
import { APP_FILTER } from '@nestjs/core';
import { TypeORMExceptionFilter } from './filters/type-orm-filter.filter';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SelectorsModule } from './selectors/selectors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    MembersModule,
    AuthModule,
    UsersModule,
    SelectorsModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: TypeORMExceptionFilter,
    },
  ],
})

export class AppModule { }
