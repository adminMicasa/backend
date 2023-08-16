import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'miembros' })
export class Members {
    @PrimaryGeneratedColumn({ name: 'PK_Id_miembro' })
    id: number;

    @Column({ name: 'nombres' })
    names: string;

    @Column({ name: 'apellidos' })
    lastnames: string;

    @Column({ name: 'edad' })
    age: string;

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
    volunteer: string;

    @Column({ name: 'redsocial' })
    socialNetwork: string;

    @Column({ name: 'como_nos_conociste' })
    howFindUs: string;

    @Column({ name: 'discipulado' })
    discipleship: string;

    @Column({ name: 'líder_discipulado' })
    leaderDiscipleship: string;
}
