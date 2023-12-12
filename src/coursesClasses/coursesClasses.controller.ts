import { Body,Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CoursesClassesService } from './coursesClasses.service';
import { CoursesClassesBodyDto, CoursesClassesDeleteDto } from './dtos/coursesClasses.dto';
import { CoursesClassesQueryParamDto } from './dtos/coursesClasses.dto';
import { CoursesClassesParamDto } from './dtos/coursesClasses.dto';
//import { CoursesClasses } from './entities/coursesClasses.entity';
import { ApiTags } from '@nestjs/swagger';
import { PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';

@Controller('coursesClasses')
export class CoursesClassesController {
    constructor(
        private readonly coursesclassesService: CoursesClassesService,
    ) { }

    @ApiTags('coursesClasses')
    @Get()
    getCoursesClasses(
        @Query() queryParams: CoursesClassesQueryParamDto,
    ) {
        return this.coursesclassesService.getAll(
            new PaginationApi(queryParams.page, queryParams.perPage),
            queryParams);
    }

    @ApiTags('coursesClasses')
    @Get(':id')
    getCoursesClassesById(
        @Param() coursParam: CoursesClassesParamDto,
    ) {
        const { id } = coursParam
        return this.coursesclassesService.getCoursesClassesById(id);
    }

    @ApiTags('coursesClasses')
    @Get('byCourseId/:courseId')
    getCoursesClassesByCourseId(
        @Param('courseId') courseIdParam: number
    ) {
        const  coursesClass  = this.coursesclassesService.getCoursesClassesByCourse(courseIdParam);

        return coursesClass;
    }


    @ApiTags('coursesClasses')
    @Post()
    createCoursesClasses(
        @Body() coursesClassesBody: CoursesClassesBodyDto,
    ) {
        return this.coursesclassesService.createCoursesClasses(coursesClassesBody);
    }

    @ApiTags('coursesClasses')
    @Put(':id')
    updateCoursesClasses(
        @Param() courssParam: CoursesClassesParamDto,
        @Body() courssBody: CoursesClassesBodyDto,
    ) {
        return this.coursesclassesService.updateCoursesClasses(+courssParam.id, courssBody);
    }

    @ApiTags('coursesClasses')
    @Delete(':id')
    deleteCoursesClasses(
        @Param() curssssParam: CoursesClassesParamDto,
    ) {
        return this.coursesclassesService.deleteCoursesClasses(+curssssParam.id);
    }

}
