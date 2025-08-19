import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: 'student' | 'teacher';

    @OneToOne(() => Teacher, teacher => teacher.user)
    teacherProfile: Teacher;
}
