import { Body,Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { EnrollmentCoursesService } from './enrollmentCourses.service';
import { EnrollmentCourseBodyDto, EnrollmentCourseDeleteDto } from './dtos/enrollmentCourses.dto';
import { EnrollmentCoursesQueryParamDto } from './dtos/enrollmentCourses.dto';
import { EnrollmentCourseParamDto } from './dtos/enrollmentCourses.dto';
import { EnrollmentCourse } from './entities/enrollmentCourses.entity';
import { ApiTags } from '@nestjs/swagger';
import { PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';

@Controller('enrollmentCourses')
export class EnrollmentCoursesController {
    constructor(
        private readonly enrollmentcoursesService: EnrollmentCoursesService,
    ) { }

    @ApiTags('enrollmentCourses')
    @Get()
    getEnrollmentCourses(
        @Query() queryParams: EnrollmentCoursesQueryParamDto,
    ) {
        return this.enrollmentcoursesService.getAll(
            new PaginationApi(queryParams.page, queryParams.perPage),
            queryParams);
    }

    @ApiTags('enrollmentCourses')
    @Get(':id')
    getEnrollmentCourseById(
        @Param() coursParam: EnrollmentCourseParamDto,
    ) {
        const { id } = coursParam
        return this.enrollmentcoursesService.getEnrollmentCourseById(id);
    }

    @ApiTags('enrollmentCourses')
    @Post()
    createEnrollmentCourse(
        @Body() enrollmentCourssBody: EnrollmentCourseBodyDto,
    ) {
        return this.enrollmentcoursesService.createEnrollmentCourse(enrollmentCourssBody);
    }

    @ApiTags('enrollmentCourses')
    @Put(':id')
    updateEnrollmentCourse(
        @Param() courssParam: EnrollmentCourseParamDto,
        @Body() courssBody: EnrollmentCourseBodyDto,
    ) {
        return this.enrollmentcoursesService.updateEnrollmentCourse(+courssParam.id, courssBody);
    }

    @ApiTags('enrollmentCourses')
    @Delete(':id')
    deleteEnrollmentCourse(
        @Param() curssssParam: EnrollmentCourseParamDto,
    ) {
        return this.enrollmentcoursesService.deleteEnrollmentCourse(+curssssParam.id);
    }

}
