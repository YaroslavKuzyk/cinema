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
var S3Gateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Gateway = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let S3Gateway = S3Gateway_1 = class S3Gateway {
    configService;
    client;
    bucket;
    region;
    logger = new common_1.Logger(S3Gateway_1.name);
    constructor(configService) {
        this.configService = configService;
        this.region = this.configService.getOrThrow('AWS_REGION');
        this.bucket = this.configService.getOrThrow('AWS_S3_BUCKET');
        this.client = new client_s3_1.S3Client({
            region: this.region,
            credentials: {
                accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
            },
            requestChecksumCalculation: 'WHEN_REQUIRED',
            responseChecksumValidation: 'WHEN_REQUIRED',
        });
    }
    async getUploadUrl(key, _contentType, expiresIn = 3600) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.client, command, { expiresIn });
        const expiresAt = new Date(Date.now() + expiresIn * 1000);
        this.logger.log(`Generated upload URL for key: ${key}`);
        return { url, key, expiresAt };
    }
    async getDownloadUrl(key, expiresIn = 3600) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.client, command, { expiresIn });
        const expiresAt = new Date(Date.now() + expiresIn * 1000);
        this.logger.log(`Generated download URL for key: ${key}`);
        return { url, key, expiresAt };
    }
    getPublicUrl(key) {
        return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
    }
    async delete(key) {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });
        await this.client.send(command);
        this.logger.log(`Deleted file: ${key}`);
    }
};
exports.S3Gateway = S3Gateway;
exports.S3Gateway = S3Gateway = S3Gateway_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Gateway);
//# sourceMappingURL=s3.gateway.js.map