import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
interface ServiceHealth {
    name: string;
    status: 'healthy' | 'unhealthy' | 'unknown';
    error?: string;
}
interface HealthResponse {
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: string;
    gateway: string;
    kafka: ServiceHealth;
}
export declare class HealthController implements OnModuleInit {
    private readonly identityClient;
    private kafkaConnected;
    constructor(identityClient: ClientKafka);
    onModuleInit(): Promise<void>;
    check(): Promise<HealthResponse>;
    liveness(): Promise<{
        status: string;
    }>;
    readiness(): Promise<{
        status: string;
        kafka: boolean;
    }>;
}
export {};
