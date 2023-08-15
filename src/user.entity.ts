import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class miembros {
    @PrimaryGeneratedColumn()
    PK_Id_miembro: number;

    @Column()
    nombres: string;

    @Column()
    apellidos: string;
}
