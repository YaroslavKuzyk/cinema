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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const storage_service_1 = require("./domain/storage.service");
const dtos_1 = require("./dtos");
let StorageController = class StorageController {
    storageService;
    constructor(storageService) {
        this.storageService = storageService;
    }
    async getUploadUrl(dto) {
        return this.storageService.getUploadUrl(dto.key, dto.contentType, dto.expiresIn);
    }
    async getDownloadUrl(dto) {
        return this.storageService.getDownloadUrl(dto.key, dto.expiresIn);
    }
    async delete(key) {
        return this.storageService.delete(key);
    }
};
exports.StorageController = StorageController;
__decorate([
    (0, common_1.Post)('upload-url'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a presigned URL for file upload' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Upload URL generated successfully',
        type: dtos_1.UploadUrlResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request parameters' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.GetUploadUrlDto]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "getUploadUrl", null);
__decorate([
    (0, common_1.Post)('download-url'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a presigned URL for file download' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Download URL generated successfully',
        type: dtos_1.DownloadUrlResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request parameters' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.GetDownloadUrlDto]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "getDownloadUrl", null);
__decorate([
    (0, common_1.Delete)('*key'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a file from storage' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'File deleted successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                key: { type: 'string', example: 'movies/poster-123.jpg' },
            },
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'File not found' }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "delete", null);
exports.StorageController = StorageController = __decorate([
    (0, swagger_1.ApiTags)('Storage'),
    (0, common_1.Controller)('storage'),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], StorageController);
//# sourceMappingURL=storage.controller.js.map