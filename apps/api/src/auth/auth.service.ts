import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

type JwtPayload = {
  username: string;
  sub: string;
};

const EXPIRE_TIME = 15 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signin(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const payload: JwtPayload = {
      username: user.email,
      sub: user.id,
    };

    const { accessToken, refreshToken } = await this.generateToken(payload);
    await this.updateRefreshToken(user.id, refreshToken);

    user.sessionKey = undefined;

    return {
      user,
      tokens: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  private async generateToken(
    payload: JwtPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const salt = await genSalt(10);
    const hasedRefreshToken = await hash(refreshToken, salt);
    await this.usersService.update(userId, { sessionKey: hasedRefreshToken });
  }

  async validateUser(dto: AuthDto) {
    const user = await this.usersService.findByEmail(dto.username);

    if (!user) throw new UnauthorizedException();

    const passwordMatch = await compare(dto.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException();

    user.password = undefined;
    return user;
  }

  async refresh(token: string, payload: JwtPayload) {
    if (!token) throw new UnauthorizedException();

    const user = await this.usersService.findById(payload.sub);
    if (!user) throw new UnauthorizedException();

    const tokenMatch = await compare(token.split(' ')[1], user.sessionKey);
    if (!tokenMatch) throw new UnauthorizedException();

    const { accessToken, refreshToken } = await this.generateToken({
      sub: payload.sub,
      username: payload.username,
    });
    await this.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
