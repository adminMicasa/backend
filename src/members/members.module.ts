import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Municipality } from 'src/selectors/entities/municipality.entity';
import { SelectorsModule } from 'src/selectors/selectors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member,Municipality], 'default'),
    SelectorsModule
  ],
  providers: [MembersService],
  exports: [MembersService],
  controllers: [MembersController],
})
export class MembersModule { }
