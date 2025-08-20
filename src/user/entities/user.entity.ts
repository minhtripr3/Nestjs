import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn } from 'typeorm';
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
    refesh_token: string;

    @CreateDateColumn()
    create_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @Column()
    role: 'student' | 'teacher';

    @OneToOne(() => Teacher, teacher => teacher.user)
    teacherProfile: Teacher;
}
export { Teacher };

