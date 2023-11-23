import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/courses.entity';
import { SelectorsModule } from 'src/selectors/selectors.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Course], 'default'),
    SelectorsModule
  ],
  providers: [CoursesService],
  exports: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule { }
