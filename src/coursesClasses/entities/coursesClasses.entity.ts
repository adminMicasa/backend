
import { StepTopic } from 'src/stepTopics/entities/stepTopic.entity';
import { Course } from 'src/courses/entities/courses.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'clase' })
export class CoursesClasses {
    @PrimaryGeneratedColumn({ name: 'PK_Id_Clase' })
    id: number;

    @Column({ name: 'numeroClase' })
    numberClass: number;

    @Column({ name: 'fecha' })
    classDate: Date;

    @ManyToOne(() => StepTopic, stepTopic => stepTopic.courseClasses)
    @JoinColumn({ name: 'FK_id_tema' })
    topicId: StepTopic
    
    @ManyToOne(() => Course, course => course.courseClasses)
    @JoinColumn({ name: 'FK_id_escuela' })
    courseId: Course
}
