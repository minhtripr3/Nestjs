import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: "987654321",
      signOptions: { expiresIn: "1h" }
    }),
    ConfigModule // Import User entity for TypeORM
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
