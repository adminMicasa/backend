import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      
      name: 'default',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        name: 'default',
        type: 'mssql',
        applicationName: 'micasa-api',
        host: configService.get('db_host'),
        port: parseInt(configService.get('db_port')),
        username: configService.get('db_user'),
        password: configService.get('db_pass'),
        database: configService.get('db_name'),
        entities: ['dist/**/*.entity.js'],
        synchronize: false,
        logging:true
      }),
    }),
  ],
})
export class DatabaseModule { }
