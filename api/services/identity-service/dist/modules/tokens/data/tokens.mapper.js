"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensMapper = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let TokensMapper = class TokensMapper {
    toData(data) {
        return {
            id: data.id,
            userId: data.userId,
            type: data.type,
            token: data.token,
            expiresAt: data.expiresAt,
            createdAt: data.createdAt,
            deviceInfo: data.deviceInfo ?? undefined,
            ipAddress: data.ipAddress ?? undefined,
            lastUsed: data.lastUsed ?? undefined,
        };
    }
    toCreate(data) {
        return {
            id: `token-${(0, uuid_1.v4)()}`,
            user: { connect: { id: data.userId } },
            type: data.type,
            token: data.token,
            expiresAt: data.expiresAt,
            deviceInfo: data.deviceInfo,
            ipAddress: data.ipAddress,
        };
    }
};
exports.TokensMapper = TokensMapper;
exports.TokensMapper = TokensMapper = __decorate([
    (0, common_1.Injectable)()
], TokensMapper);
//# sourceMappingURL=tokens.mapper.js.map