import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from './public.reflector';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('signup')
  async registerUser(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Public()
  @Post('signin')
  async loginUser(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Post('refresh')
  async refresh(@Request() request) {
    return this.authService.refresh(
      request.headers['authorization'],
      request.user,
    );
  }
}
