import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';
import { Occupation } from './entities/occupation.entity';
import { SocialNetwork } from './entities/social-network.entity';
import { SelectorsController } from './selectors.controller';
import { SelectorsService } from './selectors.service';
import { HowKnow } from './entities/how-know.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Municipality, Occupation, SocialNetwork, HowKnow], 'default'),
  ],
  providers: [SelectorsService],
  exports: [SelectorsService],
  controllers: [SelectorsController],
})
export class SelectorsModule { }
