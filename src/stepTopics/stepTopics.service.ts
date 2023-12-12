import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StepTopic } from './entities/stepTopic.entity';
import { ILike, Like, Repository } from 'typeorm';
import { FiltersApiStepTopics, PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';
import { StepTopicsBodyDto } from './dtos/stepTopics.dto';
import { SelectorsService } from 'src/selectors/selectors.service';
import { Course } from 'src/courses/entities/courses.entity';


@Injectable()
export class StepTopicsService {
    private readonly logger = new Logger(StepTopicsService.name);

    constructor(
        @InjectRepository(StepTopic)
        private readonly stepTopicsRepository: Repository<StepTopic>,

        @InjectRepository(Course)
        private readonly courseRepository: Repository <Course>,

        private readonly selectorsService: SelectorsService,
        
    ) {

    }

    async getAll(paginator: PaginationApi, filters: FiltersApiStepTopics) {
        const skip = (paginator.page - 1) * (paginator.perPage == -1 ? 0 : paginator.perPage);

        const [data, total] = await this.stepTopicsRepository.findAndCount({
            skip,
            take: paginator.perPage == -1 ? 0 : paginator.perPage,
            where: {
                topicName: filters.topicName
            },
            relations: ['stepId']
            
        });
        return { data, metadata: { total, perPage: paginator.perPage, page: paginator.page } };
    }

    async getStepTopicsById(id: number) {
        const courseClass = await this.stepTopicsRepository.findOne(
            {
                where: {
                    id: id
                },
                relations: ['stepId']
            },
        );
        if (!courseClass) {
            throw new NotFoundException('No se encuentra el tema solicitado!');
        }
        return courseClass;
    }

    async getStepTopicsByStep(stepId: number) {
        const topicsByStep = await this.stepTopicsRepository
        .createQueryBuilder('topicsByStep')
        .leftJoinAndSelect('topicsByStep.stepId','step')
        .where('step.id = :stepId', {stepId})
        .getMany();
        if (!topicsByStep) {
            throw new NotFoundException('No se encuentran los temas solicitados!');
        }
        return topicsByStep;
    }

    async getStepTopicsByCourse(courseId: number) {
        /*const stepTopics = await this.courseRepository
        .createQueryBuilder('course')
        .innerJoinAndSelect('course.step','step')
        .innerJoinAndSelect('step.stepTopic','stepTopic')
        .where('course.id = :courseId', {courseId})
        .select(['stepTopic_tema'])
        .getMany();
*/

        const topicsByStep = await this.stepTopicsRepository
        .createQueryBuilder('topicsByStep')
        .innerJoinAndSelect('topicsByStep.stepId','step')
        .innerJoinAndSelect('step.courses','course')
        .where('course.id = :courseId', {courseId})
        .select(['topicsByStep.topicName','topicsByStep.id'])
        .getMany();
        if (!topicsByStep) {
            throw new NotFoundException('No se encuentran los temas solicitados!');
        }
        return topicsByStep;
    }

    async createStepTopics(stepTopicBody: StepTopicsBodyDto) {
        const stepTopic = await this.buildStepTopics(stepTopicBody);
        const created = await this.stepTopicsRepository.save(stepTopic);
        if (!created) {
            throw new BadRequestException('No se logro crear el tema!');
        }
        return created;
    }


    async updateStepTopics(id: number, stepTopicBody: StepTopicsBodyDto) {
        const stepTopic = await this.buildStepTopics(stepTopicBody);
        const updated = await this.stepTopicsRepository.save({ id, ...stepTopic });
        if (!updated) {
            throw new BadRequestException(`No se logro actualizar el tema #: ${id}`);
        }
        return updated;
    }

    async deleteStepTopics(id: number) {
        const stepTopic = await this.stepTopicsRepository.findOne({where:{id: id},relations: ['stepId']},);
        const deleted = await this.stepTopicsRepository.delete({id});
        if (!deleted) {
            throw new BadRequestException(`No se logro eliminar el curso #: ${id}`);
        }
        return deleted;    
        
    }

    async buildStepTopics(stepTopicBody: StepTopicsBodyDto) {
        let step = null;
        if (stepTopicBody.stepId)
        step = await this.selectorsService.getStepById(stepTopicBody.stepId);
        const stepTopic = this.stepTopicsRepository.create({
            topicName:stepTopicBody.topicName,
            stepId: step            
        });
        return stepTopic;
    }

}
