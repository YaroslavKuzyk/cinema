import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { ITokenPayload } from '../domain/auth.types';
declare const JwtAccessStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtAccessStrategy extends JwtAccessStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: ITokenPayload): {
        id: string;
        email: string;
    };
}
export {};
