"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TemplateService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateService = void 0;
const common_1 = require("@nestjs/common");
const Handlebars = __importStar(require("handlebars"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let TemplateService = TemplateService_1 = class TemplateService {
    logger = new common_1.Logger(TemplateService_1.name);
    templatesPath;
    compiledTemplates = new Map();
    constructor() {
        this.templatesPath = path.join(__dirname, '../templates');
        this.registerHelpers();
    }
    registerHelpers() {
        Handlebars.registerHelper('formatDate', (date) => {
            return new Date(date).toLocaleDateString('uk-UA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        });
        Handlebars.registerHelper('currentYear', () => {
            return new Date().getFullYear();
        });
        Handlebars.registerHelper('formatDuration', (minutes) => {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            if (hours > 0) {
                return `${hours} год ${mins} хв`;
            }
            return `${mins} хв`;
        });
    }
    render(templateName, context) {
        try {
            if (!this.compiledTemplates.has(templateName)) {
                const templatePath = path.join(this.templatesPath, `${templateName}.hbs`);
                const templateSource = fs.readFileSync(templatePath, 'utf-8');
                const compiled = Handlebars.compile(templateSource);
                this.compiledTemplates.set(templateName, compiled);
            }
            const template = this.compiledTemplates.get(templateName);
            if (!template) {
                throw new Error(`Template ${templateName} not found`);
            }
            return template(context);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Failed to render template ${templateName}: ${message}`);
            throw new Error(`Failed to render template ${templateName}: ${message}`);
        }
    }
    clearCache() {
        this.compiledTemplates.clear();
    }
};
exports.TemplateService = TemplateService;
exports.TemplateService = TemplateService = TemplateService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TemplateService);
//# sourceMappingURL=template.service.js.map