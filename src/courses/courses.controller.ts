import { Body,Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseBodyDto, CourseDeleteDto } from './dtos/courses.dto';
import { CoursesQueryParamDto } from './dtos/courses.dto';
import { CourseParamDto } from './dtos/courses.dto';
import { Course } from './entities/courses.entity';
import { ApiTags } from '@nestjs/swagger';
import { PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';

@Controller('courses')
export class CoursesController {
    constructor(
        private readonly coursesService: CoursesService,
    ) { }

    @ApiTags('courses')
    @Get()
    getCourses(
        @Query() queryParams: CoursesQueryParamDto,
    ) {
        return this.coursesService.getAll(
            new PaginationApi(queryParams.page, queryParams.perPage),
            queryParams);
    }

    @ApiTags('courses')
    @Get(':id')
    getCourseById(
        @Param() coursParam: CourseParamDto,
    ) {
        const { id } = coursParam
        return this.coursesService.getCourseById(id);
    }

    @ApiTags('courses')
    @Post()
    createCourse(
        @Body() courssBody: CourseBodyDto,
    ) {
        return this.coursesService.createCourse(courssBody);
    }

    @ApiTags('courses')
    @Put(':id')
    updateCourse(
        @Param() courssParam: CourseParamDto,
        @Body() courssBody: CourseBodyDto,
    ) {
        return this.coursesService.updateCourse(+courssParam.id, courssBody);
    }

    @ApiTags('courses')
    @Delete(':id')
    deleteCourse(
        @Param() curssssParam: CourseParamDto,
    ) {
        return this.coursesService.deleteCourse(+curssssParam.id);
    }

}
