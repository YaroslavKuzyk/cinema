"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./domain/users.service");
const users_gateway_1 = require("./domain/users.gateway");
const users_mapper_1 = require("./data/users.mapper");
const users_gateway_2 = require("./data/users.gateway");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        providers: [
            { provide: users_gateway_1.IUsersGateway, useClass: users_gateway_2.UsersGateway },
            users_service_1.UsersService,
            users_mapper_1.UsersMapper,
        ],
        exports: [
            { provide: users_gateway_1.IUsersGateway, useClass: users_gateway_2.UsersGateway },
            users_service_1.UsersService,
            users_mapper_1.UsersMapper,
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map