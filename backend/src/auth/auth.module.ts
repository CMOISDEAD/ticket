import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'nestjs-prisma';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';

const secret = process.env.JWT_SECRET;

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: secret,
      signOptions: { expiresIn: '24h' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
