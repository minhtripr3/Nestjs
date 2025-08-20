import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Teacher } from 'src/user/entities/teacher.entity';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
        @InjectRepository(User) private userRepo: Repository<User>,
    ) { }

    findAll(): Promise<Teacher[]> {
        return this.teacherRepo.find({ relations: ['user'] });
    }

    async findOne(id: number): Promise<Teacher> {
        const teacher = await this.teacherRepo.findOne({ where: { id }, relations: ['user'] });
        if (!teacher) throw new NotFoundException('Teacher not found');
        return teacher;
    }

    async create(teacherData: Partial<Teacher>, userId: number): Promise<Teacher> {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user) throw new NotFoundException('User not found');
        const teacher = this.teacherRepo.create({ ...teacherData, user });
        return this.teacherRepo.save(teacher);
    }

    async update(id: number, updateData: Partial<Teacher>): Promise<Teacher> {
        const teacher = await this.findOne(id);
        Object.assign(teacher, updateData);
        return this.teacherRepo.save(teacher);
    }

    async remove(id: number): Promise<void> {
        await this.teacherRepo.delete(id);
    }
}