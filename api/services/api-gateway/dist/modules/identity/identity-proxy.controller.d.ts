import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
export declare class IdentityProxyController {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    private readonly identityServiceUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    proxyAuth(req: Request, res: Response): Promise<void>;
    proxyProfile(req: Request, res: Response): Promise<void>;
    proxyUsers(req: Request, res: Response): Promise<void>;
    private proxyRequest;
}
