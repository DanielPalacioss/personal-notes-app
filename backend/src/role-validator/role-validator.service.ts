import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RoleValidatorService {
  isAdmin(role: string) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Not authorized');
    }
  }
}
