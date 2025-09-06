/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (
            req.cookies &&
            'token' in req.cookies &&
            req.cookies.token.length > 0
          ) {
            return req.cookies.token;
          }

          return null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: { userId: string }) {
    const user = await this.usersService.findOne(payload.userId);
    if (!user) throw new UnauthorizedException('User doesnt exist.');
    if (!user.active) throw new UnauthorizedException('User is not active.');
    return user;
  }
}
