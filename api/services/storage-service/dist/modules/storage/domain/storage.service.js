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
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const storage_gateway_1 = require("./storage.gateway");
let StorageService = class StorageService {
    storageGateway;
    constructor(storageGateway) {
        this.storageGateway = storageGateway;
    }
    async getUploadUrl(key, contentType, expiresIn) {
        return this.storageGateway.getUploadUrl(key, contentType, expiresIn);
    }
    async getDownloadUrl(key, expiresIn) {
        return this.storageGateway.getDownloadUrl(key, expiresIn);
    }
    getPublicUrl(key) {
        return this.storageGateway.getPublicUrl(key);
    }
    async delete(key) {
        try {
            await this.storageGateway.delete(key);
            return { success: true, key };
        }
        catch (error) {
            return {
                success: false,
                key,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [storage_gateway_1.IStorageGateway])
], StorageService);
//# sourceMappingURL=storage.service.js.map