import { Injectable, Logger } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TemplateService {
  private readonly logger = new Logger(TemplateService.name);
  private templatesPath: string;
  private compiledTemplates: Map<string, HandlebarsTemplateDelegate> = new Map();

  constructor() {
    this.templatesPath = path.join(__dirname, '../templates');
    this.registerHelpers();
  }

  private registerHelpers(): void {
    Handlebars.registerHelper('formatDate', (date: Date) => {
      return new Date(date).toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    });

    Handlebars.registerHelper('currentYear', () => {
      return new Date().getFullYear();
    });

    Handlebars.registerHelper('formatDuration', (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (hours > 0) {
        return `${hours} год ${mins} хв`;
      }
      return `${mins} хв`;
    });
  }

  render(templateName: string, context: Record<string, unknown>): string {
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
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to render template ${templateName}: ${message}`);
      throw new Error(`Failed to render template ${templateName}: ${message}`);
    }
  }

  clearCache(): void {
    this.compiledTemplates.clear();
  }
}
