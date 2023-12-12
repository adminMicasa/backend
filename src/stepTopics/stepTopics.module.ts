import { Module } from '@nestjs/common';
import { StepTopicsService } from './stepTopics.service';
import { StepTopicsController } from './stepTopics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepTopic } from './entities/stepTopic.entity';
import { SelectorsModule } from 'src/selectors/selectors.module';
import { Course } from 'src/courses/entities/courses.entity';
//import { CoursesClassesModule } from 'src/coursesClasses/coursesClasses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StepTopic], 'default'),
    TypeOrmModule.forFeature([Course]),

    SelectorsModule,
  
  ],
  providers: [StepTopicsService],
  exports: [StepTopicsService],
  controllers: [StepTopicsController],
})
export class StepTopicsModule { }
