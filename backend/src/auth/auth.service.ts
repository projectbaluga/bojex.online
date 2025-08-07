import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(email: string, password: string): User {
    return this.usersService.create(email, password);
  }

  login(email: string, password: string): User | null {
    const user = this.usersService.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
