import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  private generateToken(user: User): string {
    return jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRATION || '1h' },
    );
  }

  async register(email: string, password: string) {
    if (this.usersService.findByEmail(email)) {
      return { error: 'Email already registered' };
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersService.create(email, hashed);
    const token = this.generateToken(user);
    const { password: _pw, ...safeUser } = user;
    return { user: safeUser, token };
  }

  async login(email: string, password: string) {
    const user = this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = this.generateToken(user);
      const { password: _pw, ...safeUser } = user;
      return { user: safeUser, token };
    }
    return { error: 'Invalid credentials' };
  }

  refresh(token: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret', {
        ignoreExpiration: true,
      }) as { sub: number };
      const user = this.usersService.findById(payload.sub);
      if (!user) {
        return { error: 'Invalid token' };
      }
      const newToken = this.generateToken(user);
      const { password: _pw, ...safeUser } = user;
      return { user: safeUser, token: newToken };
    } catch {
      return { error: 'Invalid token' };
    }
  }

  me(userId: number) {
    const user = this.usersService.findById(userId);
    if (!user) return null;
    const { password: _pw, ...safeUser } = user;
    return safeUser;
  }
}
