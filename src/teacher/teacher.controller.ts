import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from 'src/user/entities/user.entity';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) { }

    @Get()
    getAll(): Promise<Teacher[]> {
        return this.teacherService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Teacher> {
        return this.teacherService.findOne(parseInt(id)); // Chuyển id thành number
    }

    @Post()
    create(@Body() body: Partial<Teacher> & { userId: number }): Promise<Teacher> {
        return this.teacherService.create(body, body.userId);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<Teacher>): Promise<Teacher> {
        return this.teacherService.update(parseInt(id), body); // Chuyển id thành number
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.teacherService.remove(parseInt(id)); // Chuyển id thành number
    }
}