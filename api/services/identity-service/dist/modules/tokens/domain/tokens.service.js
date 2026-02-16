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
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const tokens_gateway_1 = require("./tokens.gateway");
let TokensService = class TokensService {
    tokensGateway;
    constructor(tokensGateway) {
        this.tokensGateway = tokensGateway;
    }
    async create(data) {
        return this.tokensGateway.create(data);
    }
    async findByToken(token) {
        return this.tokensGateway.findByToken(token);
    }
    async findValidByToken(token) {
        return this.tokensGateway.findValidByToken(token);
    }
    async findAllByUserIdAndType(userId, type) {
        return this.tokensGateway.findAllByUserIdAndType(userId, type);
    }
    async updateByToken(token, data) {
        return this.tokensGateway.updateByToken(token, data);
    }
    async deleteByToken(token) {
        return this.tokensGateway.deleteByToken(token);
    }
    async deleteExpired() {
        return this.tokensGateway.deleteExpired();
    }
    async deleteByUserIdAndType(userId, type) {
        return this.tokensGateway.deleteByUserIdAndType(userId, type);
    }
    async deleteAllByUserId(userId) {
        return this.tokensGateway.deleteAllByUserId(userId);
    }
};
exports.TokensService = TokensService;
exports.TokensService = TokensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tokens_gateway_1.ITokensGateway])
], TokensService);
//# sourceMappingURL=tokens.service.js.map