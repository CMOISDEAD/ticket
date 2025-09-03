import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { roundsOfHashing } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user)
      throw new NotFoundException(`No user found with ${email} email.`);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password.');

    await this.mailService.sendLoginEmail(user);

    return {
      message: 'Login successful',
      accessToken: this.jwtService.sign({
        userId: user.id,
      }),
    };
  }

  async register(registerDto: RegisterDto) {
    const isEmailTaken = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (isEmailTaken)
      throw new ConflictException(
        `email ${registerDto.email} is already taken.`,
      );

    registerDto.password = await bcrypt.hash(
      registerDto.password,
      roundsOfHashing,
    );

    const user = await this.prisma.user.create({
      data: registerDto,
    });

    await this.mailService.sendLoginEmail(user);

    return {
      message: 'User registered successfully.',
    };
  }

  async requestPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user)
      throw new NotFoundException(`No user found with ${email} email.`);

    const token = this.jwtService.sign({
      userId: user.id,
    });

    await this.mailService.sendRequestPasswordResetEmail(user, token);

    return {
      message: 'Password reset email sent.',
    };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload: { userId: string } = this.jwtService.verify(token);

      const hashedPassword = await bcrypt.hash(newPassword, roundsOfHashing);

      const user = await this.prisma.user.update({
        where: { id: payload.userId },
        data: {
          password: hashedPassword,
        },
      });

      await this.mailService.sendPasswordResetEmail(user);

      return {
        message: 'Password reset successfully.',
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
