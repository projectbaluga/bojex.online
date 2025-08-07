import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PublicUser } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(email: string, password: string): PublicUser {
    const user = this.usersService.create(email, password);
    return this.usersService.sanitizeUser(user);
  }

  login(email: string, password: string): PublicUser | null {
    const user = this.usersService.findByEmail(email);
    if (user && user.password === password) {
      return this.usersService.sanitizeUser(user);
    }
    return null;
  }
}
