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
var IdentityProxyController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityProxyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let IdentityProxyController = IdentityProxyController_1 = class IdentityProxyController {
    httpService;
    configService;
    logger = new common_1.Logger(IdentityProxyController_1.name);
    identityServiceUrl;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.identityServiceUrl =
            this.configService.get('IDENTITY_SERVICE_URL') || 'http://localhost:8001';
    }
    async proxyAuth(req, res) {
        await this.proxyRequest(req, res, 'auth');
    }
    async proxyProfile(req, res) {
        await this.proxyRequest(req, res, 'profile');
    }
    async proxyUsers(req, res) {
        await this.proxyRequest(req, res, 'users');
    }
    async proxyRequest(req, res, basePath) {
        const targetPath = req.url;
        const targetUrl = `${this.identityServiceUrl}${targetPath}`;
        this.logger.debug(`Proxying ${req.method} ${req.url} -> ${targetUrl}`);
        const headers = {};
        if (req.headers.authorization) {
            headers['Authorization'] = req.headers.authorization;
        }
        if (req.headers['content-type']) {
            headers['Content-Type'] = req.headers['content-type'];
        }
        if (req.headers.cookie) {
            headers['Cookie'] = req.headers.cookie;
        }
        if (req.headers['x-request-id']) {
            headers['X-Request-Id'] = req.headers['x-request-id'];
        }
        if (req.headers['x-forwarded-for']) {
            headers['X-Forwarded-For'] = req.headers['x-forwarded-for'];
        }
        else if (req.ip) {
            headers['X-Forwarded-For'] = req.ip;
        }
        const config = {
            method: req.method,
            url: targetUrl,
            headers,
            data: req.body,
            validateStatus: () => true,
            timeout: 80000,
        };
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.request(config).pipe((0, rxjs_1.timeout)(80000), (0, rxjs_1.catchError)((error) => {
                this.logger.error(`Proxy error for ${req.method} ${targetUrl}: ${error.message}`, error.stack);
                throw error;
            })));
            const setCookieHeader = response.headers['set-cookie'];
            if (setCookieHeader) {
                res.setHeader('Set-Cookie', setCookieHeader);
            }
            const contentType = response.headers['content-type'];
            if (contentType) {
                res.setHeader('Content-Type', contentType);
            }
            res.status(response.status).send(response.data);
        }
        catch (error) {
            const axiosError = error;
            if (axiosError.code === 'ECONNREFUSED') {
                this.logger.error(`Identity service is unavailable at ${this.identityServiceUrl}`);
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.SERVICE_UNAVAILABLE,
                    message: 'Identity service is currently unavailable',
                    error: 'Service Unavailable',
                }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
            }
            if (axiosError.code === 'ETIMEDOUT' || axiosError.code === 'ECONNABORTED') {
                this.logger.error(`Request to identity service timed out: ${targetUrl}`);
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.GATEWAY_TIMEOUT,
                    message: 'Request to identity service timed out',
                    error: 'Gateway Timeout',
                }, common_1.HttpStatus.GATEWAY_TIMEOUT);
            }
            this.logger.error(`Unexpected proxy error: ${axiosError.message}`, axiosError.stack);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_GATEWAY,
                message: 'An error occurred while communicating with the identity service',
                error: 'Bad Gateway',
            }, common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
exports.IdentityProxyController = IdentityProxyController;
__decorate([
    (0, common_1.All)('auth/*'),
    (0, swagger_1.ApiOperation)({ summary: 'Proxy authentication requests to identity-service' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityProxyController.prototype, "proxyAuth", null);
__decorate([
    (0, common_1.All)('profile/*'),
    (0, swagger_1.ApiOperation)({ summary: 'Proxy profile requests to identity-service' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityProxyController.prototype, "proxyProfile", null);
__decorate([
    (0, common_1.All)('users/*'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityProxyController.prototype, "proxyUsers", null);
exports.IdentityProxyController = IdentityProxyController = IdentityProxyController_1 = __decorate([
    (0, swagger_1.ApiTags)('Identity'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], IdentityProxyController);
//# sourceMappingURL=identity-proxy.controller.js.map