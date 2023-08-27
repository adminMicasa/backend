import { Member } from 'src/members/entities/member.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'municipios' })
export class Municipality {
    @PrimaryGeneratedColumn({ name: 'PK_Id_municipos' })
    id: number;
    @Column({ name: 'municipio' })
    name: string;

    @OneToMany(() => Member, member => member.municipality)
    members: Member[];
}
