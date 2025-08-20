import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Teacher } from 'src/user/entities/user.entity';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    datetime: Date;

    @Column({ default: 'pending' })
    status: 'pending' | 'confirmed' | 'cancelled';

    @ManyToOne(() => User)
    student: User;

    @ManyToOne(() => Teacher)
    teacher: Teacher;
}
