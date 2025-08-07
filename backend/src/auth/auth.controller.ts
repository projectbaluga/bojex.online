import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() credentials: AuthCredentialsDto) {
    return this.authService.register(credentials.email, credentials.password);
  }

  @Post('login')
  async login(@Body() credentials: AuthCredentialsDto) {
    const result = await this.authService.login(
      credentials.email,
      credentials.password,
    );
    if (!result) {
      return { error: 'Invalid credentials' };
    }
    return result;
  }

  @Get('google')
  google() {
    return { message: 'Google OAuth not yet implemented' };
  }

  @Get('discord')
  discord() {
    return { message: 'Discord OAuth not yet implemented' };
  }
}
