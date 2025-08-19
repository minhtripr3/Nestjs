import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Teacher } from './teacher.entity';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    student: User;

    @ManyToOne(() => Teacher)
    teacher: Teacher;

    @Column()
    datetime: Date;

    @Column({ default: 'pending' })
    status: string;
}
