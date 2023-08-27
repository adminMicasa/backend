import { Member } from 'src/members/entities/member.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'redesSociales' })
export class SocialNetwork {
    @PrimaryGeneratedColumn({ name: 'PK_Id_redsocial' })
    id: number;
    @Column({ name: 'nombreRedSocial' })
    name: string;

    @OneToMany(() => Member, member => member.municipality)
    members: Member[];
}
