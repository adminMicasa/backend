import { Module } from '@nestjs/common';
import { CoursesClassesService } from './coursesClasses.service';
import { CoursesClassesController } from './coursesClasses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesClasses } from './entities/coursesClasses.entity';
import { CoursesModule } from 'src/courses/courses.module';
import { StepTopicsModule } from 'src/stepTopics/stepTopics.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([CoursesClasses], 'default'),
    CoursesModule,
    StepTopicsModule
  ],
  providers: [CoursesClassesService],
  exports: [CoursesClassesService],
  controllers: [CoursesClassesController],
})
export class CoursesClassesModule { }
