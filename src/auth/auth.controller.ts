import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto,
  LoginResponseDto,
  UserBasicInfor,
  VerifyTokenResponseDto,
} from './dto/login.dto';
import { SignUpFirstStepDto, SignUpSecondStepDto } from './dto/sign-up.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

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
  login(@Body() LoginDto: LoginDto): LoginResponseDto {
    return this.authService.login(LoginDto) as unknown as LoginResponseDto;
  }

  @Post('sign-up/step-1')
  signUpFirstStep(@Body() signUpFirstStepDto: SignUpFirstStepDto) {
    return this.authService.signUpFirstStep(signUpFirstStepDto);
  }

  @Post('sign-up/step-2')
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
