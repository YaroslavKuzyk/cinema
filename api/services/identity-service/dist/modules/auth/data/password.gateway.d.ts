import { IPasswordGateway } from '../domain/password.gateway';
export declare class PasswordGateway implements IPasswordGateway {
    hash(password: string): Promise<string>;
    compare(password: string, hashedPassword: string): Promise<boolean>;
}
