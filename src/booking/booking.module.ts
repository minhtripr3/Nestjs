import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from 'src/user/entities/booking.entity';
import { User } from 'src/user/entities/user.entity';
import { Teacher } from 'src/user/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Teacher])], // Thêm User và Teacher
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule { }