import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesClasses } from './entities/coursesClasses.entity';
import { ILike, Like, Repository } from 'typeorm';
import { FiltersApiCoursesClasses, FiltersApiEnrollmentCourses, PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';
import { CoursesClassesBodyDto } from './dtos/coursesClasses.dto';
import { CoursesService } from 'src/courses/courses.service';
import { StepTopicsService } from 'src/stepTopics/stepTopics.service';

@Injectable()
export class CoursesClassesService {
    private readonly logger = new Logger(CoursesClassesService.name);

    constructor(
        @InjectRepository(CoursesClasses, 'default')
        private readonly coursesClassesRepository: Repository<CoursesClasses>,
        private readonly coursesService: CoursesService,
        private readonly stepTopicsService : StepTopicsService
    ) {

    }

    async getAll(paginator: PaginationApi, filters: FiltersApiCoursesClasses) {
        const skip = (paginator.page - 1) * (paginator.perPage == -1 ? 0 : paginator.perPage);

        const [data, total] = await this.coursesClassesRepository.findAndCount({
            skip,
            take: paginator.perPage == -1 ? 0 : paginator.perPage,
            where: {
                numberClass: filters.numberClass,
                classDate: filters.classDate

            },
            relations: ['topicId','courseId']
        });
        return { data, metadata: { total, perPage: paginator.perPage, page: paginator.page } };
    }

    async getCoursesClassesById(id: number) {
        const courseClass = await this.coursesClassesRepository.findOne(
            {
                where: {
                    id: id
                },
                relations: ['topicId','courseId']
            },
        );
        if (!courseClass) {
            throw new NotFoundException('No se encuentra la clase solicitada!');
        }
        return courseClass;
    }

    async getCoursesClassesByCourse(courseId: number) {
        const courseClass = await this.coursesClassesRepository
        .createQueryBuilder('courseClass')
        .leftJoinAndSelect('courseClass.topicId','topic')
        .leftJoinAndSelect('courseClass.courseId','course')
        .where('course.id = :courseId', {courseId})
        .getMany();
        if (!courseClass) {
            throw new NotFoundException('No se encuentran las clases solicitadas!');
        }
        return courseClass;
    }


    async getCoursesClassesByMember(topicId: number) {
        const courseClass = await this.coursesClassesRepository
        .createQueryBuilder('courseClass')
        .leftJoinAndSelect('courseClass.topicId','topic')
        .leftJoinAndSelect('courseClass.courseId','course')
        .where('topic.id = :topicId', {topicId})
        .getMany();
        if (!courseClass) {
            throw new NotFoundException('No se encuentran las clases solicitadas!');
        }
        return courseClass;
    }


    async createCoursesClasses(coursesClassesBody: CoursesClassesBodyDto) {
        const courseClass = await this.builCoursesClasses(coursesClassesBody);
        const created = await this.coursesClassesRepository.save(courseClass);
        if (!created) {
            throw new BadRequestException('No se logro crear la clase!');
        }
        return created;
    }

    async updateCoursesClasses(id: number, coursesClassesBody: CoursesClassesBodyDto) {
        const courseClass = await this.builCoursesClasses(coursesClassesBody);
        const updated = await this.coursesClassesRepository.save({ id, ...courseClass });
        if (!updated) {
            throw new BadRequestException(`No se logro actualizar la clase #: ${id}`);
        }
        return updated;
    }

    async deleteCoursesClasses(id: number) {
        const courseClass = await this.coursesClassesRepository.findOne({where:{id: id},relations: ['topicId','courseId']},);
        const deleted = await this.coursesClassesRepository.delete({id});
        if (!deleted) {
            throw new BadRequestException(`No se logro eliminar el curso #: ${id}`);
        }
        return deleted;    
        
    }

    async builCoursesClasses(coursesClassesBody: CoursesClassesBodyDto) {
        let course = null;
        let topic = null;
        if (coursesClassesBody.courseId)
            course = await this.coursesService.getCourseById(coursesClassesBody.courseId);
            topic = await this.stepTopicsService.getStepTopicsById(coursesClassesBody.topicId);
        const courseClass = this.coursesClassesRepository.create({
            numberClass: coursesClassesBody.numberClass,
            classDate: coursesClassesBody.classDate,
            courseId:course,
            topicId:topic
            
        });
        return courseClass;
    }

}
