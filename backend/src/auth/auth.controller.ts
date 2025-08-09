import { Body, Controller, Post, UseGuards, Req, Get, NotImplementedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() _dto: LoginDto, @Req() req: any) {
    return this.authService.login(req.user);
  }

  @Get('google')
  google() {
    throw new NotImplementedException();
  }

  @Get('discord')
  discord() {
    throw new NotImplementedException();
  }
}
