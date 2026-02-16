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
exports.ProfileGateway = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma.service");
const profile_mapper_1 = require("./profile.mapper");
let ProfileGateway = class ProfileGateway {
    prisma;
    mapper;
    constructor(prisma, mapper) {
        this.prisma = prisma;
        this.mapper = mapper;
    }
    async findByUserId(userId) {
        const profile = await this.prisma.profile.findUnique({
            where: { userId },
        });
        return profile ? this.mapper.toProfileData(profile) : null;
    }
    async create(data) {
        const profile = await this.prisma.profile.create({ data });
        return this.mapper.toProfileData(profile);
    }
    async update(userId, data) {
        const profile = await this.prisma.profile.update({
            where: { userId },
            data,
        });
        return this.mapper.toProfileData(profile);
    }
    async delete(userId) {
        await this.prisma.profile.delete({ where: { userId } });
    }
};
exports.ProfileGateway = ProfileGateway;
exports.ProfileGateway = ProfileGateway = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        profile_mapper_1.ProfileMapper])
], ProfileGateway);
//# sourceMappingURL=profile.gateway.js.map