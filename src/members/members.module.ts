import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member], 'default'),
  ],
  providers: [MembersService],
  exports: [MembersService],
  controllers: [MembersController],
})
export class MembersModule { }
