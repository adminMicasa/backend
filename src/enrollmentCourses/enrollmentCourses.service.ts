import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnrollmentCourse } from './entities/enrollmentCourses.entity';
import { ILike, Like, Repository } from 'typeorm';
import { FiltersApiEnrollmentCourses, PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';
import { EnrollmentCourseBodyDto } from './dtos/enrollmentCourses.dto';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class EnrollmentCoursesService {
    private readonly logger = new Logger(EnrollmentCoursesService.name);

    constructor(
        @InjectRepository(EnrollmentCourse, 'default')
        private readonly enrollmentCoursesRepository: Repository<EnrollmentCourse>,
        private readonly coursesService: CoursesService,
        
    ) {

    }

    async getAll(paginator: PaginationApi, filters: FiltersApiEnrollmentCourses) {
        const skip = (paginator.page - 1) * (paginator.perPage == -1 ? 0 : paginator.perPage);

        const [data, total] = await this.enrollmentCoursesRepository.findAndCount({
            skip,
            take: paginator.perPage == -1 ? 0 : paginator.perPage,
            where: {
                state: ILike(`%${filters.state || ''}%`),
            },
            relations: ['courseId']
        });
        return { data, metadata: { total, perPage: paginator.perPage, page: paginator.page } };
    }

    async getEnrollmentCourseById(id: number) {
        const enrollmentCourse = await this.enrollmentCoursesRepository.findOne(
            {
                where: {
                    id: id
                },
                //relations: ['course']
            },
        );
        if (!enrollmentCourse) {
            throw new NotFoundException('No se encuentra el curso solicitado!');
        }
        return enrollmentCourse;
    }

    async createEnrollmentCourse(enrollmentCourseBody: EnrollmentCourseBodyDto) {
        const enrollmentCourse = await this.builEnrollmentCourse(enrollmentCourseBody);
        const created = await this.enrollmentCoursesRepository.save(enrollmentCourse);
        if (!created) {
            throw new BadRequestException('No se logro crear el curso!');
        }
        return created;
    }

    async updateEnrollmentCourse(id: number, enrollmentCourseBody: EnrollmentCourseBodyDto) {
        const enrollmentCourse = await this.builEnrollmentCourse(enrollmentCourseBody);
        const updated = await this.enrollmentCoursesRepository.save({ id, ...enrollmentCourse });
        if (!updated) {
            throw new BadRequestException(`No se logro actualizar el curso #: ${id}`);
        }
        return updated;
    }

    async deleteEnrollmentCourse(id: number) {
        const course = await this.enrollmentCoursesRepository.findOne({where:{id: id},relations: ['course']},);
        if(course.state=="activo"){
            throw new BadRequestException(`No se puede eliminar el curso porque esta activo`);
        }
        else{
            const deleted = await this.enrollmentCoursesRepository.delete({id});
            if (!deleted) {
                throw new BadRequestException(`No se logro eliminar el curso #: ${id}`);
            }
        return deleted;    
        }
    }

    async builEnrollmentCourse(enrollmentCourseBody: EnrollmentCourseBodyDto) {
        let course = null;
        if (enrollmentCourseBody.courseId)
            course = await this.coursesService.getCourseById(enrollmentCourseBody.courseId);

        const enrollmentCourse = this.enrollmentCoursesRepository.create({
            state: enrollmentCourseBody.state,
            member: enrollmentCourseBody.memberId,
            courseId:course
            
        });
        return enrollmentCourse;
    }

}
