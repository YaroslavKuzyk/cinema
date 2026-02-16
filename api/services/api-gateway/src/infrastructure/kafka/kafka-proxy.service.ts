import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError, throwError } from 'rxjs';
import {
  IDENTITY_PATTERNS,
  STORAGE_PATTERNS,
  IKafkaRequest,
  IKafkaRequestContext,
  IKafkaResponse,
} from '@cinema/shared';
import type { Request, Response } from 'express';

@Injectable()
export class KafkaProxyService implements OnModuleInit {
  private readonly logger = new Logger(KafkaProxyService.name);
  private readonly REQUEST_TIMEOUT = 30000;

  constructor(
    @Inject('IDENTITY_SERVICE') private readonly identityClient: ClientKafka,
    @Inject('STORAGE_SERVICE') private readonly storageClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Subscribe to identity response topics
    Object.values(IDENTITY_PATTERNS).forEach((pattern) => {
      this.identityClient.subscribeToResponseOf(pattern);
    });

    // Subscribe to storage response topics
    Object.values(STORAGE_PATTERNS).forEach((pattern) => {
      this.storageClient.subscribeToResponseOf(pattern);
    });

    // Connect clients
    await Promise.all([
      this.identityClient.connect(),
      this.storageClient.connect(),
    ]);

    this.logger.log('Kafka clients connected and subscribed to response topics');
  }

  buildContext(req: Request, userId?: string): IKafkaRequestContext {
    return {
      userId,
      cookies: req.cookies,
      requestId: req.headers['x-request-id'] as string,
      userAgent: req.headers['user-agent'],
      ip: req.ip || (req.headers['x-forwarded-for'] as string),
      timestamp: Date.now(),
    };
  }

  async sendToIdentity<T, R>(
    pattern: string,
    data: T,
    context: IKafkaRequestContext,
  ): Promise<IKafkaResponse<R>> {
    const request: IKafkaRequest<T> = { data, context };

    return firstValueFrom(
      this.identityClient.send<IKafkaResponse<R>>(pattern, request).pipe(
        timeout(this.REQUEST_TIMEOUT),
        catchError((err) => {
          this.logger.error(`Identity service error [${pattern}]: ${err.message}`);
          return throwError(() => err);
        }),
      ),
    );
  }

  async sendToStorage<T, R>(
    pattern: string,
    data: T,
    context: IKafkaRequestContext,
  ): Promise<IKafkaResponse<R>> {
    const request: IKafkaRequest<T> = { data, context };

    return firstValueFrom(
      this.storageClient.send<IKafkaResponse<R>>(pattern, request).pipe(
        timeout(this.REQUEST_TIMEOUT),
        catchError((err) => {
          this.logger.error(`Storage service error [${pattern}]: ${err.message}`);
          return throwError(() => err);
        }),
      ),
    );
  }

  applyResponseMetadata(res: Response, kafkaResponse: IKafkaResponse): void {
    if (kafkaResponse.cookies) {
      for (const cookie of kafkaResponse.cookies) {
        if (cookie.action === 'set' && cookie.value) {
          res.cookie(cookie.name, cookie.value, cookie.options || {});
        } else if (cookie.action === 'clear') {
          res.clearCookie(cookie.name, cookie.options || {});
        }
      }
    }
  }
}
