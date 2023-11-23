import { Module } from '@nestjs/common';
import { EnrollmentCoursesService } from './enrollmentCourses.service';
import { EnrollmentCoursesController } from './enrollmentCourses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentCourse } from './entities/enrollmentCourses.entity';
import { CoursesModule } from 'src/courses/courses.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([EnrollmentCourse], 'default'),
    CoursesModule
  ],
  providers: [EnrollmentCoursesService],
  exports: [EnrollmentCoursesService],
  controllers: [EnrollmentCoursesController],
})
export class EnrollmentCoursesModule { }
