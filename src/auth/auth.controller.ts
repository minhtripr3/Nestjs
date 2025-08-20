import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post("register")
    register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
        console.log("Registering user with data:");
        console.log(registerUserDto);
        return this.authService.registerUser(registerUserDto);
    }
    @Post("login")
    @UsePipes(ValidationPipe)
    login(@Body() LoginUserDto: LoginUserDto): Promise<any> {
        console.log("Logging in user with email:");
        console.log(LoginUserDto);
        return this.authService.login(LoginUserDto);
    }
    @Post('refresh-token')
    refreshToken(@Body() { refresh_token }): Promise<any> {
        console.log("refesh token api")
        return this.authService.refreshToken(refresh_token)
    }

}
