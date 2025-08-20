import { Controller, Post, Get, Param, Body, Put } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from 'src/user/entities/booking.entity';

@Controller('booking')
export class BookingController {
    constructor(private bookingService: BookingService) { }

    @Post()
    create(@Body() body: any): Promise<Booking> {
        return this.bookingService.create(body.studentId, body.teacherId, body.datetime);
    }

    @Get('student/:studentId')
    getByStudent(@Param('studentId') studentId: number): Promise<Booking[]> {
        return this.bookingService.findByStudent(studentId);
    }

    @Get('teacher/:teacherId')
    getByTeacher(@Param('teacherId') teacherId: number): Promise<Booking[]> {
        return this.bookingService.findByTeacher(teacherId);
    }

    @Put(':id/status')
    updateStatus(@Param('id') id: number, @Body() body: { status: 'pending' | 'confirmed' | 'cancelled' }): Promise<Booking> {
        return this.bookingService.updateStatus(id, body.status);
    }
}
