import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/user/entities/booking.entity';
import { User } from 'src/user/entities/user.entity';
import { Teacher } from 'src/user/entities/teacher.entity';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
    ) { }

    async create(studentId: number, teacherId: number, datetime: Date): Promise<Booking> {
        const student = await this.userRepo.findOneBy({ id: studentId });
        if (!student) throw new NotFoundException('Student not found');
        const teacher = await this.teacherRepo.findOneBy({ id: teacherId });
        if (!teacher) throw new NotFoundException('Teacher not found');

        const booking = this.bookingRepo.create({ student, teacher, datetime });
        return this.bookingRepo.save(booking);
    }

    async findByStudent(studentId: number): Promise<Booking[]> {
        return this.bookingRepo.find({ where: { student: { id: studentId } }, relations: ['teacher', 'student'] });
    }

    async findByTeacher(teacherId: number): Promise<Booking[]> {
        return this.bookingRepo.find({ where: { teacher: { id: teacherId } }, relations: ['teacher', 'student'] });
    }

    async updateStatus(id: number, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Booking> {
        const booking = await this.bookingRepo.findOne({ where: { id } });
        if (!booking) throw new NotFoundException('Booking not found');
        booking.status = status;
        return this.bookingRepo.save(booking);
    }
}
