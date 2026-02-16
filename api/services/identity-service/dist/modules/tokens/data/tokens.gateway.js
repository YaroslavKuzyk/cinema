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
exports.TokensGateway = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma.service");
const tokens_mapper_1 = require("./tokens.mapper");
let TokensGateway = class TokensGateway {
    prisma;
    tokensMapper;
    constructor(prisma, tokensMapper) {
        this.prisma = prisma;
        this.tokensMapper = tokensMapper;
    }
    async create(data) {
        const token = await this.prisma.userToken.create({
            data: this.tokensMapper.toCreate(data),
        });
        return this.tokensMapper.toData(token);
    }
    async findByToken(token) {
        const result = await this.prisma.userToken.findUnique({ where: { token } });
        return result ? this.tokensMapper.toData(result) : null;
    }
    async findValidByToken(token) {
        const result = await this.prisma.userToken.findFirst({
            where: { token, expiresAt: { gt: new Date() } },
        });
        return result ? this.tokensMapper.toData(result) : null;
    }
    async findAllByUserIdAndType(userId, type) {
        const results = await this.prisma.userToken.findMany({
            where: { userId, type },
        });
        return results.map((r) => this.tokensMapper.toData(r));
    }
    async updateByToken(token, data) {
        const result = await this.prisma.userToken.update({
            where: { token },
            data,
        });
        return this.tokensMapper.toData(result);
    }
    async deleteByToken(token) {
        await this.prisma.userToken.delete({ where: { token } });
    }
    async deleteExpired() {
        const result = await this.prisma.userToken.deleteMany({
            where: { expiresAt: { lt: new Date() } },
        });
        return result.count;
    }
    async deleteByUserIdAndType(userId, type) {
        const result = await this.prisma.userToken.deleteMany({
            where: { userId, type },
        });
        return result.count;
    }
    async deleteAllByUserId(userId) {
        const result = await this.prisma.userToken.deleteMany({
            where: { userId },
        });
        return result.count;
    }
};
exports.TokensGateway = TokensGateway;
exports.TokensGateway = TokensGateway = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tokens_mapper_1.TokensMapper])
], TokensGateway);
//# sourceMappingURL=tokens.gateway.js.map