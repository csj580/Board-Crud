/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('/signup')
    async signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<void>{        
        return this.authService.signUp(authcredentialsDto);
    }
    
    @Post('signin')
    signIn(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authcredentialsDto);
    }
}
