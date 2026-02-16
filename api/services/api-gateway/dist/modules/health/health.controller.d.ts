import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
interface ServiceHealth {
    name: string;
    status: 'healthy' | 'unhealthy';
    responseTime?: number;
    error?: string;
}
interface HealthResponse {
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: string;
    services: ServiceHealth[];
}
export declare class HealthController {
    private readonly httpService;
    private readonly configService;
    constructor(httpService: HttpService, configService: ConfigService);
    check(): Promise<HealthResponse>;
    liveness(): Promise<{
        status: string;
    }>;
    readiness(): Promise<{
        status: string;
    }>;
    private checkService;
}
export {};
