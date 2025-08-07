import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.authService.register(email, password);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = this.authService.login(email, password);
    if (!user) {
      return { error: 'Invalid credentials' };
    }
    return user;
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
