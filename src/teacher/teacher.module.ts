import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher, User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, User])], // Thêm Teacher và User vào TypeOrmModule
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule { }