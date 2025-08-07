import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PublicUser } from '../users/user.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const user = await this.usersService.create(email, password);
    const publicUser = this.usersService.sanitizeUser(user);
    const token = this.jwtService.sign({ sub: publicUser.id });
    return { user: publicUser, token };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      const publicUser = this.usersService.sanitizeUser(user);
      const token = this.jwtService.sign({ sub: publicUser.id });
      return { user: publicUser, token };
    }
    return null;
  }
}
