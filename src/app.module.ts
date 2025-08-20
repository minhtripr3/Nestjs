import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Teacher } from './user/entities/teacher.entity';
import { Booking } from './user/entities/booking.entity';
import dataSource, { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TeacherModule } from './teacher/teacher.module';
import { BookingModule } from './booking/booking.module';


@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule, AuthModule, ConfigModule.forRoot(), TeacherModule, BookingModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
// // type: 'mysql',
//     host: 'localhost',
//     port: 33061,
//     username: 'root',
//     password: 'root',
//     database: 'blog-nestjs',
//     entities: [User, Teacher, Booking],

//     synchronize: true,
