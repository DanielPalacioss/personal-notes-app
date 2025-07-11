import { Request } from 'express';

export interface Payload {
  sub: string;
  role: string;
}

export interface RequestWithUser extends Request {
  user: Payload;
}
