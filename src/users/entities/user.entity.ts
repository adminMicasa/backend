import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class User {
    @PrimaryGeneratedColumn({ name: 'PK_Id_usuario' })
    id: number;
    @Column({ name: 'nombre' })
    name: string;
    @Column({ name: 'correo' })
    email: string;
    @Column({ name: 'contrasena' })
    password: string;
}
