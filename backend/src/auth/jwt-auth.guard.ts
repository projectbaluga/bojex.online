import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) return false;
    const [, token] = authHeader.split(' ');
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      request.user = payload;
      return true;
    } catch (e) {
      return false;
    }
  }
}
