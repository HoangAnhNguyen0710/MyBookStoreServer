import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

// Define the expected JWT payload structure
export interface JwtPayload {
  sub: string; // User ID
  email: string;
  iat?: number; // Issued at timestamp
  exp?: number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    // console.log(req.headers);
    const publicRoutes = [
      '/login',
      '/sign-in/step-1',
      '/sign-in/step-2',
      'validate-pw-set-token',
    ];
    if (publicRoutes.includes(req.path)) {
      return next(); // Skip authentication for public routes
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.split(' ')[1];

    try {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-unused-vars
      const decoded = (await this.jwtService.verifyAsync(token)) as JwtPayload;
      next();
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
