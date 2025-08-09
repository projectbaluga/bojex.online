import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
  login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @Post('google')
  googlePlaceholder() {
    throw new HttpException(
      { status: 'not_implemented' },
      HttpStatus.NOT_IMPLEMENTED,
    );
  }

  @Post('discord')
  discordPlaceholder() {
    throw new HttpException(
      { status: 'not_implemented' },
      HttpStatus.NOT_IMPLEMENTED,
    );
  }
}
