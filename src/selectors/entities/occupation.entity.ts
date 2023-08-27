import { Member } from 'src/members/entities/member.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'ocupacion' })
export class Occupation {
    @PrimaryGeneratedColumn({ name: 'PK_Id_ocupacion' })
    id: number;
    @Column({ name: 'ocupacion' })
    name: string;

    @OneToMany(() => Member, member => member.municipality)
    members: Member[];
}
