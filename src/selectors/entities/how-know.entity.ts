import { Member } from 'src/members/entities/member.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'comoConociste' })
export class HowKnow {
    @PrimaryGeneratedColumn({ name: 'PK_Id_comoConociste' })
    id: number;
    @Column({ name: 'comoConociste' })
    name: string;

    @OneToMany(() => Member, member => member.municipality)
    members: Member[];
}
