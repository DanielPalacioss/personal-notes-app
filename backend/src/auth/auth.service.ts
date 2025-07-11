import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from './dtos/login-requestDto';
import { PrismaService } from '../prisma/prisma.service';
import { Payload } from '../common/interfaces/auth-interfaces';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  generateToken(user: { id: string; firstName: string; role: string }) {
    const payload: Payload = {
      sub: user.id,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  async validateUser({ usernameOrEmail, password }: LoginRequestDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
      select: {
        id: true,
        firstName: true,
        role: true,
        password: true,
      },
    });
    if (!user) {
      throw new BadRequestException(
        `User with username/email: ${usernameOrEmail} not exists`,
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password');
    }
    const { password: unpassword, ...safeUser } = user;
    return safeUser;
  }
}
