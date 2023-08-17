import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'miembros' })
export class Member {
    @PrimaryGeneratedColumn({ name: 'PK_Id_miembro' })
    id: string;
    @Column({ name: 'nombres' })
    names: string;
    @Column({ name: 'apellidos' })
    lastnames: string;
    @Column({ name: 'edad' })
    age: number;
    @Column({ name: 'celular' })
    phone: string;
    @Column({ name: 'correo_electronico' })
    email: string;
    @Column({ name: 'municipio' })
    municipality: string;
    @Column({ name: 'barrio' })
    district: string;
    @Column({ name: 'ocupacion' })
    occupation: string;
    @Column({ name: 'voluntario' })
    volunteer: boolean;
    @Column({ name: 'redsocial' })
    socialNetwork: string;
    @Column({ name: 'como_nos_conociste' })
    howFindUs: string;
    @Column({ name: 'discipulado' })
    discipleship: boolean;
    @Column({ name: 'líder_discipulado' })
    leaderDiscipleship: string;
}
