import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { Http2ServerRequest } from 'http2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    [x: string]: any;
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
        private configSerVice: ConfigService
    ) { }
    async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
        const hashedPassword = await this.hashPassword(registerUserDto.password);
        return await this.userRepository.save({ ...registerUserDto, refesh_token: "refesh_token_string", password: hashedPassword });
    }
    async login(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.userRepository.findOne(
            {
                where: { email: loginUserDto.email }
            }
        )
        if (!user) {
            throw new HttpException("Email is not Exist", HttpStatus.UNAUTHORIZED);
        }
        const checkPass = bcrypt.compareSync(loginUserDto.password, user.password);
        if (!checkPass) {
            throw new HttpException("Password is not correct", HttpStatus.UNAUTHORIZED)
        }
        // generate access token và refesh token
        const payload = { id: user.id, email: user.email, role: user.role };
        return this.generateToken(payload);
    }
    async refreshToken(refresh_token: string): Promise<any> {
        try {
            // Xác thực token
            const verify = await this.jwtService.verifyAsync(refresh_token, {
                secret: this.configSerVice.get<string>('SERECT'),
            });

            console.log('Verify payload:', verify);

            // Check token có tồn tại trong DB không
            const checkExitToken = await this.userRepository.findOneBy({
                email: verify.email,
                refesh_token: refresh_token, // lưu đúng key refresh_token
            });

            if (checkExitToken) {
                return this.generateToken({ id: verify.id, email: verify.email, role: verify.role });
            } else {
                throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            console.error(error);
            throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
        }
    }

    async generateToken(payload: { id: number; email: string; role: string }) {
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configSerVice.get<string>('SERECT'),
            expiresIn: this.configSerVice.get<string>('EXP_IN_ACCESS_TOKEN'),
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configSerVice.get<string>('SERECT'),
            expiresIn: this.configSerVice.get<string>('EXP_IN_REFRESH_TOKEN'),
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }



    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
}
