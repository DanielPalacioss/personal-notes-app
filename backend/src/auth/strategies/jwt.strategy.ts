import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Payload } from '../../common/interfaces/auth-interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        (req: Request) => req?.cookies?.jwt,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'daniel_secret',
    });
  }

  validate(payload: Payload) {
    return payload;
  }
}
