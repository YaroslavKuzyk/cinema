export declare class TemplateService {
    private readonly logger;
    private templatesPath;
    private compiledTemplates;
    constructor();
    private registerHelpers;
    render(templateName: string, context: Record<string, unknown>): string;
    clearCache(): void;
}
