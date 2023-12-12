import { Module } from '@nestjs/common';
import { EnrollmentCoursesService } from './enrollmentCourses.service';
import { EnrollmentCoursesController } from './enrollmentCourses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentCourse } from './entities/enrollmentCourses.entity';
import { CoursesModule } from 'src/courses/courses.module';
import { MembersModule } from 'src/members/members.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([EnrollmentCourse], 'default'),
    CoursesModule,
    MembersModule
  ],
  providers: [EnrollmentCoursesService],
  exports: [EnrollmentCoursesService],
  controllers: [EnrollmentCoursesController],
})
export class EnrollmentCoursesModule { }
