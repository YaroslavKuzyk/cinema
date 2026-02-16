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
exports.DownloadUrlResponseDto = exports.GetDownloadUrlDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class GetDownloadUrlDto {
    key;
    expiresIn;
}
exports.GetDownloadUrlDto = GetDownloadUrlDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'movies/poster-123.jpg',
        description: 'The key (path) of the file to download',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetDownloadUrlDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 3600,
        description: 'URL expiration time in seconds (default: 3600)',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(60),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetDownloadUrlDto.prototype, "expiresIn", void 0);
class DownloadUrlResponseDto {
    url;
    key;
    expiresAt;
}
exports.DownloadUrlResponseDto = DownloadUrlResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://bucket.s3.region.amazonaws.com/movies/poster-123.jpg?...',
        description: 'The presigned URL to download the file',
    }),
    __metadata("design:type", String)
], DownloadUrlResponseDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'movies/poster-123.jpg',
        description: 'The key of the file',
    }),
    __metadata("design:type", String)
], DownloadUrlResponseDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-15T12:00:00.000Z',
        description: 'The expiration time of the URL',
    }),
    __metadata("design:type", Date)
], DownloadUrlResponseDto.prototype, "expiresAt", void 0);
//# sourceMappingURL=download-url.dto.js.map