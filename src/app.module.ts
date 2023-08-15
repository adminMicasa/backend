import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { miembros } from './user.entity';

//jdbc:sqlserver://serversomosmicasa.database.windows.net:1433;database=micasaiglesia;user=adminMiCasa@serversomosmicasa;password={your_password_here};encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mssql',
    host: 'serversomosmicasa.database.windows.net', // Cambia esto a la dirección de tu servidor SQL Server
    port: 1433, // Puerto por defecto de SQL Server
    username: 'adminMiCasa',
    password: 'Redes@2023',
    database: 'micasaiglesia',
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ruta a tus entidades
    synchronize: false, // Sincroniza las entidades con la base de datos (solo en desarrollo)
  }),
  TypeOrmModule.forFeature([miembros], 'default')],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
