import { Course } from 'src/courses/entities/courses.entity';
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
}
