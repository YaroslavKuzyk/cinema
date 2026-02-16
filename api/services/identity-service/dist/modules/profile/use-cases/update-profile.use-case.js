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
exports.UpdateProfileUseCase = void 0;
const common_1 = require("@nestjs/common");
const profile_gateway_1 = require("../domain/profile.gateway");
let UpdateProfileUseCase = class UpdateProfileUseCase {
    profileGateway;
    constructor(profileGateway) {
        this.profileGateway = profileGateway;
    }
    async execute(userId, data) {
        const existingProfile = await this.profileGateway.findByUserId(userId);
        if (!existingProfile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        return this.profileGateway.update(userId, data);
    }
};
exports.UpdateProfileUseCase = UpdateProfileUseCase;
exports.UpdateProfileUseCase = UpdateProfileUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profile_gateway_1.IProfileGateway])
], UpdateProfileUseCase);
//# sourceMappingURL=update-profile.use-case.js.map