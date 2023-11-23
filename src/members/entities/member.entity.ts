import { HowKnow } from 'src/selectors/entities/how-know.entity';
import { Municipality } from 'src/selectors/entities/municipality.entity';
import { Occupation } from 'src/selectors/entities/occupation.entity';
import { SocialNetwork } from 'src/selectors/entities/social-network.entity';
import { EnrollmentCourse } from 'src/enrollmentCourses/entities/enrollmentCourses.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'miembros' })
export class Member {
    @PrimaryGeneratedColumn({ name: 'PK_Id_miembro' })
    id: number;
    @Column({ name: 'nombres' })
    names: string;
    @Column({ name: 'apellidos' })
    lastnames: string;
    @Column({ name: 'edad' })
    age: number;
    @Column({ name: 'sexo' })
    sex: string;
    @Column({ name: 'celular' })
    phone: string;
    @Column({ name: 'correoElectronico' })
    email: string;
    @Column({ name: 'barrio' })
    district: string;
    @Column({ name: 'voluntario' })
    volunteer: boolean;
    @Column({ name: 'activo' })
    active: boolean;

    @ManyToOne(() => Municipality, municipality => municipality.members)
    @JoinColumn({ name: 'FK_Id_municipio' })
    municipality: Municipality;

    @ManyToOne(() => Occupation, occupation => occupation.members)
    @JoinColumn({ name: 'FK_Id_ocupacion' })
    occupation: Occupation;

    @ManyToOne(() => SocialNetwork, socialNetwork => socialNetwork.members)
    @JoinColumn({ name: 'FK_Id_redsocial' })
    socialNetwork: SocialNetwork;

    @ManyToOne(() => HowKnow, howKnow => howKnow.members)
    @JoinColumn({ name: 'FK_Id_comoConociste' })
    howKnow: HowKnow;

    @OneToMany(() => EnrollmentCourse, enrollmentCourse => enrollmentCourse.member)
    enrollmentCourse: EnrollmentCourse[];

    
    @OneToMany(() => Member, member => member.municipality)
    members: Member[];

}
