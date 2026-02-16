"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMapper = void 0;
const common_1 = require("@nestjs/common");
let AuthMapper = class AuthMapper {
    toUserInfo(user) {
        return {
            id: user.id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            emailVerified: user.emailVerified,
        };
    }
    toAuthResult(tokens, user) {
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: this.toUserInfo(user),
        };
    }
    toTokensResult(tokens) {
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
};
exports.AuthMapper = AuthMapper;
exports.AuthMapper = AuthMapper = __decorate([
    (0, common_1.Injectable)()
], AuthMapper);
//# sourceMappingURL=auth.mapper.js.map