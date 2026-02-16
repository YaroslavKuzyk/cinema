import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordGateway } from '../domain/password.gateway';

const SALT_ROUNDS = 10;

@Injectable()
export class PasswordGateway implements IPasswordGateway {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
