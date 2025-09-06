import { Body, Controller, Param, Patch, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { RequestResetDto } from './dto/request-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOkResponse({ type: AuthEntity })
  async login(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const payload = await this.authService.login(email, password);

    res.cookie('token', payload.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return payload;
  }

  @Post('/register')
  @ApiOkResponse({ type: AuthEntity })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('/activate/:id')
  @ApiOkResponse()
  async activeUser(@Param('id') userId: string) {
    await this.authService.activeUser(userId);
    return {
      message: 'User activated.',
    };
  }

  @Post('/logout')
  @ApiOkResponse()
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    return {
      message: 'Logged out successfully',
    };
  }

  @Post('/request-reset')
  async requestPasswordReset(@Body() { email }: RequestResetDto) {
    return await this.authService.requestPasswordReset(email);
  }

  @Patch('/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() { newPassword }: ResetPasswordDto,
  ) {
    return await this.authService.resetPassword(token, newPassword);
  }
}
