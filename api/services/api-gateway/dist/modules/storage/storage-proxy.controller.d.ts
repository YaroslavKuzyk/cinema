import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
export declare class StorageProxyController {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    private readonly storageServiceUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    proxyStorage(req: Request, res: Response): Promise<void>;
    private proxyRequest;
}
