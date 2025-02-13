import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto,
  LoginResponseDto,
  UserBasicInfor,
  VerifyTokenResponseDto,
} from './dto/login.dto';
import {
  SignUpFirstStepDto,
  SignUpFirstStepResponseDto,
  SignUpSecondStepDto,
} from './dto/sign-up.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@ApiExtraModels(
  LoginDto,
  LoginResponseDto,
  UserBasicInfor,
  SignUpFirstStepDto,
  SignUpSecondStepDto,
  VerifyTokenResponseDto,
)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    type: LoginDto,
    examples: {
      example1: {
        summary: 'Valid login credentials',
        value: {
          email: 'HoangAnhNguyen07102001@gmail.com',
          password: '12345678',
        },
      },
    },
  })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @ApiResponse({
    status: 401,
    type: UnauthorizedException,
    example: {
      message: 'User is not exist',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  login(@Body() LoginDto: LoginDto): LoginResponseDto {
    return this.authService.login(LoginDto) as unknown as LoginResponseDto;
  }

  @Post('sign-up/step-1')
  @ApiOperation({ summary: 'User sign up step 1' })
  @ApiBody({
    type: SignUpFirstStepDto,
    examples: {
      example1: {
        summary: 'Valid sign up step 1 credentials',
        value: {
          email: 'HoangAnhNguyen07102001@gmail.com',
          name: 'Hoanh',
        },
      },
    },
  })
  @ApiResponse({ status: 200, type: SignUpFirstStepResponseDto })
  @ApiResponse({
    status: 400,
    type: BadRequestException,
    example: {
      message: 'Email or Username is already exist',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  signUpFirstStep(@Body() signUpFirstStepDto: SignUpFirstStepDto) {
    return this.authService.signUpFirstStep(signUpFirstStepDto);
  }

  @Post('sign-up/step-2')
  @ApiOperation({ summary: 'User sign up step 2' })
  @ApiBody({
    type: SignUpSecondStepDto,
    examples: {
      example1: {
        summary: 'Valid sign up step 2 credentials',
        value: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          password_set_token: '123456789abcdef',
          password: 'SecureP@ssw0rd',
          avatar_url: 'https://example.com/avatar.jpg',
          phone_number: '+84916313317',
          role: 'USER',
        },
      },
    },
  })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({
    status: 400,
    type: BadRequestException,
    example: {
      message: 'User is not exist',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    type: UnauthorizedException,
    example: {
      message: 'Token is invalidated',
      error: 'Bad Request',
      statusCode: 401,
    },
  })
  signUpSecondStep(@Body() signUpSecondStepDto: SignUpSecondStepDto) {
    return this.authService.signUpSecondStep(signUpSecondStepDto);
  }

  @Get('validate-pw-set-token')
  async validatePwSetToken(@Query('token') token: string) {
    return await this.authService.validatePwSetToken(token);
  }

  @Get('validate-token')
  async validateToken(
    @Query('token') token: string,
  ): Promise<VerifyTokenResponseDto> {
    const user = await this.authService.validateToken(token);
    return { user: user as unknown as UserBasicInfor };
  }
}
