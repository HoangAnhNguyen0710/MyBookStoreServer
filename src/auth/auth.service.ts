import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpFirstStepDto, SignUpSecondStepDto } from './dto/sign-up.dto';
import { JwtPayload } from '../middleware/auth.middleware';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {} // Inject UsersService vào constructor
  async login(request: LoginDto) {
    const user = await this.usersService.findOneByEmail(request.email);
    if (!user) {
      throw new BadRequestException('User is not exist');
    }
    if (!(await bcrypt.compare(request.password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '14d',
      }),
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
  // async autoLogin(token: string) {
  //   try {
  //     // Verify the token
  //     const decoded = await this.jwtService.verifyAsync(token);

  //     // Find the user
  //     const user = await this.usersService.findOneById(decoded.sub);
  //     if (!user) {
  //       throw new UnauthorizedException('User not found');
  //     }

  //     return {
  //       message: 'User authenticated',
  //       user: {
  //         name: user.name,
  //         email: user.email,
  //         role: user.role,
  //       },
  //     };
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid or expired token');
  //   }
  // }

  async signUpFirstStep(request: SignUpFirstStepDto) {
    try {
      const newUser = await this.usersService.create(request);
      if (!newUser) return false;
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async signUpSecondStep(request: SignUpSecondStepDto) {
    try {
      await this.usersService.updateNewUser(request);
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async validatePwSetToken(token: string) {
    const user = await this.usersService.findOneByPasswordSetToken(token);
    if (!user) return null;
    return user;
  }

  async validateToken(token: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unnecessary-type-assertion
      const decoded = (await this.jwtService.verifyAsync(token)) as JwtPayload;
      const user = await this.usersService.findOneByEmail(decoded.email);
      if (!user) return null;
      return {
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
