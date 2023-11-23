import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/courses.entity';
import { ILike, Like, Repository } from 'typeorm';
import { FiltersApiCourses, PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';
import { SelectorsService } from 'src/selectors/selectors.service';
import { CourseBodyDto } from './dtos/courses.dto';

@Injectable()
export class CoursesService {
    private readonly logger = new Logger(CoursesService.name);

    constructor(
        @InjectRepository(Course, 'default')
        private readonly coursesRepository: Repository<Course>,
        private readonly selectorsService: SelectorsService,
        
    ) {

    }

    async getAll(paginator: PaginationApi, filters: FiltersApiCourses) {
        const skip = (paginator.page - 1) * (paginator.perPage == -1 ? 0 : paginator.perPage);

        const [data, total] = await this.coursesRepository.findAndCount({
            skip,
            take: paginator.perPage == -1 ? 0 : paginator.perPage,
            where: {
                name: ILike(`%${filters.name || ''}%`),
                active: filters.active,
                startDate: filters.startDate,
                endDate: filters.endDate,
            },
            relations: ['step']
        });
        return { data, metadata: { total, perPage: paginator.perPage, page: paginator.page } };
    }

    async getCourseById(id: number) {
        const course = await this.coursesRepository.findOne(
            {
                where: {
                    id: id
                },
                relations: ['step']
            },
        );
        if (!course) {
            throw new NotFoundException('No se encuentra el curso solicitado!');
        }
        return course;
    }

    async createCourse(courseBody: CourseBodyDto) {
        const course = await this.builCourse(courseBody);
        const created = await this.coursesRepository.save(course);
        if (!created) {
            throw new BadRequestException('No se logro crear el curso!');
        }
        return created;
    }

    async updateCourse(id: number, courseBody: CourseBodyDto) {
        const course = await this.builCourse(courseBody);
        const updated = await this.coursesRepository.save({ id, ...course });
        if (!updated) {
            throw new BadRequestException(`No se logro actualizar el curso #: ${id}`);
        }
        return updated;
    }

    async deleteCourse(id: number) {
        const course = await this.coursesRepository.findOne({where:{id: id},relations: ['step']},);
        if(course.active){
            throw new BadRequestException(`No se puede eliminar el curso porque esta activo`);
        }
        else{
            const deleted = await this.coursesRepository.delete({ id,active:false});
            if (!deleted) {
                throw new BadRequestException(`No se logro eliminar el curso #: ${id}`);
            }
        return deleted;    
        }
    }

    async builCourse(courseBody: CourseBodyDto) {
        let step = null;
        if (courseBody.stepId)
            step = await this.selectorsService.getStepById(courseBody.stepId);

        const course = this.coursesRepository.create({
            name: courseBody.name,
            active: courseBody.active,
            startDate: new Date(courseBody.startDate),
            endDate: courseBody.endDate,
            step: step
        });
        return course;
    }

}
