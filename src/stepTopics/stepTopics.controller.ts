import { Body,Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { StepTopicsService } from './stepTopics.service';
import { StepTopicsBodyDto, StepTopicsDeleteDto } from './dtos/stepTopics.dto';
import { StepTopicsQueryParamDto } from './dtos/stepTopics.dto';
import { StepTopicsParamDto } from './dtos/stepTopics.dto';
//import { StepTopic } from './entities/stepTopic.entity';
import { ApiTags } from '@nestjs/swagger';
import { PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';

@Controller('stepTopics')
export class StepTopicsController {
    constructor(
        private readonly stepTopicsService: StepTopicsService,
    ) { }

    @ApiTags('stepTopics')
    @Get()
    getStepTopics(
        @Query() queryParams: StepTopicsQueryParamDto,
    ) {
        return this.stepTopicsService.getAll(
            new PaginationApi(queryParams.page, queryParams.perPage),
            queryParams);
    }

    @ApiTags('stepTopics')
    @Get(':id')
    getStepTopicsById(
        @Param() topicParam: StepTopicsParamDto,
    ) {
        const { id } = topicParam
        return this.stepTopicsService.getStepTopicsById(id);
    }

    @ApiTags('stepTopics')
    @Get('byStepId/:stepId')
    getStepTopicsByStepId(
        @Param('stepId') stepIdParam: number
    ) {
        const  stepTopic  = this.stepTopicsService.getStepTopicsByStep(stepIdParam);

        return stepTopic;
    }

    @ApiTags('stepTopics')
    @Get('byCourseId/:courseId')
    getStepTopicsByCourseId(
        @Param('courseId') courseIdParam: number
    ) {
        const  stepTopicsByCourse  = this.stepTopicsService.getStepTopicsByCourse(courseIdParam);

        return stepTopicsByCourse;
    }   

    @ApiTags('stepTopics')
    @Post()
    createStepTopics(
        @Body() stepTopicBody: StepTopicsBodyDto,
    ) {
        return this.stepTopicsService.createStepTopics(stepTopicBody);
    }

    @ApiTags('stepTopics')
    @Put(':id')
    updateStepTopics(
        @Param() stepTopicParam: StepTopicsParamDto,
        @Body() stepTopicBody: StepTopicsBodyDto,
    ) {
        return this.stepTopicsService.updateStepTopics(+stepTopicParam.id, stepTopicBody);
    }

    @ApiTags('stepTopics')
    @Delete(':id')
    deleteStepTopics(
        @Param() stepTopicParam: StepTopicsParamDto,
    ) {
        return this.stepTopicsService.deleteStepTopics(+stepTopicParam.id);
    }

}
