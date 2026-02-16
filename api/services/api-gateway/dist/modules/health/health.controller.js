"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const microservices_1 = require("@nestjs/microservices");
let HealthController = class HealthController {
    identityClient;
    kafkaConnected = false;
    constructor(identityClient) {
        this.identityClient = identityClient;
    }
    async onModuleInit() {
        try {
            await this.identityClient.connect();
            this.kafkaConnected = true;
        }
        catch {
            this.kafkaConnected = false;
        }
    }
    async check() {
        const kafkaHealth = {
            name: 'kafka',
            status: this.kafkaConnected ? 'healthy' : 'unhealthy',
            error: this.kafkaConnected ? undefined : 'Kafka not connected',
        };
        const overallStatus = this.kafkaConnected ? 'healthy' : 'degraded';
        const response = {
            status: overallStatus,
            timestamp: new Date().toISOString(),
            gateway: 'healthy',
            kafka: kafkaHealth,
        };
        return response;
    }
    async liveness() {
        return { status: 'ok' };
    }
    async readiness() {
        if (!this.kafkaConnected) {
            throw new common_1.HttpException({ status: 'not ready', reason: 'Kafka not connected' }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        return { status: 'ready', kafka: true };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Check API Gateway health' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Health check passed',
        schema: {
            type: 'object',
            properties: {
                status: { type: 'string', enum: ['healthy', 'degraded', 'unhealthy'] },
                timestamp: { type: 'string', format: 'date-time' },
                gateway: { type: 'string' },
                kafka: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        status: { type: 'string', enum: ['healthy', 'unhealthy', 'unknown'] },
                        error: { type: 'string' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiServiceUnavailableResponse)({ description: 'Gateway is unhealthy' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "check", null);
__decorate([
    (0, common_1.Get)('live'),
    (0, swagger_1.ApiOperation)({ summary: 'Liveness probe - checks if the gateway is running' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Gateway is alive' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "liveness", null);
__decorate([
    (0, common_1.Get)('ready'),
    (0, swagger_1.ApiOperation)({ summary: 'Readiness probe - checks if the gateway is ready' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Gateway is ready' }),
    (0, swagger_1.ApiServiceUnavailableResponse)({ description: 'Gateway is not ready' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "readiness", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('Health'),
    (0, common_1.Controller)('health'),
    __param(0, (0, common_1.Inject)('IDENTITY_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka])
], HealthController);
//# sourceMappingURL=health.controller.js.map