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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const rxjs_2 = require("rxjs");
let HealthController = class HealthController {
    httpService;
    configService;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    async check() {
        const services = await Promise.all([
            this.checkService('identity-service', this.configService.get('IDENTITY_SERVICE_URL')),
            this.checkService('storage-service', this.configService.get('STORAGE_SERVICE_URL')),
        ]);
        const healthyCount = services.filter((s) => s.status === 'healthy').length;
        let overallStatus;
        if (healthyCount === services.length) {
            overallStatus = 'healthy';
        }
        else if (healthyCount > 0) {
            overallStatus = 'degraded';
        }
        else {
            overallStatus = 'unhealthy';
        }
        const response = {
            status: overallStatus,
            timestamp: new Date().toISOString(),
            services,
        };
        if (overallStatus === 'unhealthy') {
            throw new common_1.HttpException(response, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        return response;
    }
    async liveness() {
        return { status: 'ok' };
    }
    async readiness() {
        const identityUrl = this.configService.get('IDENTITY_SERVICE_URL');
        const storageUrl = this.configService.get('STORAGE_SERVICE_URL');
        if (!identityUrl || !storageUrl) {
            throw new common_1.HttpException({ status: 'not ready', reason: 'Missing service URLs configuration' }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        return { status: 'ready' };
    }
    async checkService(name, baseUrl) {
        if (!baseUrl) {
            return {
                name,
                status: 'unhealthy',
                error: 'Service URL not configured',
            };
        }
        const startTime = Date.now();
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${baseUrl}/health`).pipe((0, rxjs_1.timeout)(5000), (0, rxjs_1.catchError)((error) => {
                return (0, rxjs_2.of)({ error });
            })));
            if ('error' in response) {
                const error = response.error;
                return {
                    name,
                    status: 'unhealthy',
                    responseTime: Date.now() - startTime,
                    error: error.code || error.message || 'Connection failed',
                };
            }
            return {
                name,
                status: 'healthy',
                responseTime: Date.now() - startTime,
            };
        }
        catch (error) {
            const err = error;
            return {
                name,
                status: 'unhealthy',
                responseTime: Date.now() - startTime,
                error: err.code || err.message || 'Unknown error',
            };
        }
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Check API Gateway and downstream services health' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Health check passed',
        schema: {
            type: 'object',
            properties: {
                status: { type: 'string', enum: ['healthy', 'degraded', 'unhealthy'] },
                timestamp: { type: 'string', format: 'date-time' },
                services: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            status: { type: 'string', enum: ['healthy', 'unhealthy'] },
                            responseTime: { type: 'number' },
                            error: { type: 'string' },
                        },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiServiceUnavailableResponse)({ description: 'One or more services are unhealthy' }),
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
    (0, swagger_1.ApiOperation)({ summary: 'Readiness probe - checks if the gateway is ready to accept traffic' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Gateway is ready' }),
    (0, swagger_1.ApiServiceUnavailableResponse)({ description: 'Gateway is not ready' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "readiness", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('Health'),
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], HealthController);
//# sourceMappingURL=health.controller.js.map