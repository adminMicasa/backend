import { EnrollmentCourse } from 'src/enrollmentCourses/entities/enrollmentCourses.entity';
import { Step } from 'src/selectors/entities/steps.entity';

import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'escuela' })
export class Course {
    @PrimaryGeneratedColumn({ name: 'PK_Id_Escuela' })
    id: number;
    @Column({ name: 'nombreEscuela' })
    name: string;
    @Column({ name: 'activa' })
    active: boolean;
    @Column({ name: 'fechaInicio' })
    startDate: Date;
    @Column({ name: 'fechaFin' })
    endDate: Date;
    @ManyToOne(() => Step, step => step.courses)
    @JoinColumn({ name: 'FK_id_pasos' })
    step: Step;
    
    @OneToMany(() => EnrollmentCourse, enrollmentCourse => enrollmentCourse.courseId)
    enrollmentCourse: EnrollmentCourse;
}
