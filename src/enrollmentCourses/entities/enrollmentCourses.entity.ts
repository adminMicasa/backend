
import { Course } from 'src/courses/entities/courses.entity';
import { Member } from 'src/members/entities/member.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'inscripcionEscuela' })
export class EnrollmentCourse {
    @PrimaryGeneratedColumn({ name: 'PK_Id_inscripcionEscuela' })
    id: number;
    @Column({ name: 'estado' })
    state: string;

    @ManyToOne(() => Course, course => course.enrollmentCourse)
    @JoinColumn({ name: 'FK_IdEscuela' })
    courseId: Course
    @ManyToOne(() => Member, member => member.enrollmentCourse)
    @JoinColumn({ name: 'FK_id_miembro' })
    member: Member
}
