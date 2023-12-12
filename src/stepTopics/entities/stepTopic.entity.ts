
import { CoursesClasses } from 'src/coursesClasses/entities/coursesClasses.entity';
import { Step } from 'src/selectors/entities/steps.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity({ name: 'temaPaso' })
export class StepTopic {
    @PrimaryGeneratedColumn({ name: 'PK_Id_Tema' })
    id: number;

    @Column({ name: 'tema' })
    topicName: string;

    @ManyToOne(() => Step, step => step.stepTopic)
    @JoinColumn({ name: 'FK_id_pasos' })
    stepId: Step;
    
    @OneToMany(() => CoursesClasses, courseClasses => courseClasses.topicId)
    courseClasses: CoursesClasses[];
}