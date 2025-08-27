import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user)
      throw new NotFoundException(`No user found with ${email} email.`);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password.');

    return {
      accessToken: this.jwtService.sign({
        userId: user.id,
      }),
    };
  }

  register() {}

  recoverPassword() {}
}
