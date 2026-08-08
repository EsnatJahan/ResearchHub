import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result =
      await this.authService.register(registerDto);

    res.cookie(
      'access_token',
      result.access_token,
      {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      },
    );

    return {
      message: result.message,
      user: result.user,
    };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result =
      await this.authService.login(loginDto);

    res.cookie(
      'access_token',
      result.access_token,
      {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      },
    );

    return {
      message: result.message,
      user: result.user,
    };
  }

  @Post('logout')
  logout(
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('access_token');

    return {
      message: 'Logout successful',
    };
  }
}