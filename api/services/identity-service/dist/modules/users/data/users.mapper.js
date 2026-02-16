"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersMapper = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let UsersMapper = class UsersMapper {
    toData(data) {
        return {
            id: data.id,
            email: data.email,
            phoneNumber: data.phoneNumber,
            firstName: data.firstName,
            lastName: data.lastName,
            userType: data.userType,
            emailVerified: data.emailVerified,
            avatarKey: data.avatarKey,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    }
    toDataWithPassword(data) {
        return {
            ...this.toData(data),
            password: data.password,
        };
    }
    toCreate(data) {
        return {
            id: `user-${(0, uuid_1.v4)()}`,
            email: data.email,
            phoneNumber: data.phoneNumber,
            firstName: data.firstName,
            lastName: data.lastName,
            userType: data.userType,
            password: data.password,
        };
    }
    toUpdate(data) {
        return {
            email: data.email,
            phoneNumber: data.phoneNumber,
            firstName: data.firstName,
            lastName: data.lastName,
            userType: data.userType,
            password: data.password,
            emailVerified: data.emailVerified,
            avatarKey: data.avatarKey,
        };
    }
};
exports.UsersMapper = UsersMapper;
exports.UsersMapper = UsersMapper = __decorate([
    (0, common_1.Injectable)()
], UsersMapper);
//# sourceMappingURL=users.mapper.js.map