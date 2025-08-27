import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  login() {}

  register() {}

  recoverPassword() {}
}
