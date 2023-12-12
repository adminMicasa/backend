import { Course } from 'src/courses/entities/courses.entity';
import { StepTopic } from 'src/stepTopics/entities/stepTopic.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'pasos' })
export class Step {
    @PrimaryGeneratedColumn({ name: 'PK_Id_pasos' })
    id: number;

    @Column({ name: 'nombrePaso' })
    name: string;
    
    @Column({ name: 'cantidadClases' })
    classCount: number;
    
    @OneToMany(() => Course, course => course.step)
    courses: Course[];

    @OneToMany(() => StepTopic, stepTopic => stepTopic.stepId)
    stepTopic: StepTopic[];
}
