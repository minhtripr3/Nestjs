import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  bio: string;

  @Column('float', { default: 5 })
  rating: number;

  @Column('int')
  price: number;

  @Column('text')
  subjects: string;
}
