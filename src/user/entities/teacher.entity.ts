import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bio: string;

  @Column({ type: 'float', default: 5 })
  rating: number;

  @Column()
  price: number;

  @Column('text')
  subjects: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
