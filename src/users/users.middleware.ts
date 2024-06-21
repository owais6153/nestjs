import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization)
      throw new HttpException('Invalid Request', HttpStatus.FORBIDDEN);

    if (authorization !== 'AUTHORIZED')
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);

    next();
  }
}
