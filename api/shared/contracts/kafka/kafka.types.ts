// Request context passed through Kafka
export interface IKafkaRequestContext {
  userId?: string;
  cookies?: Record<string, string>;
  requestId?: string;
  userAgent?: string;
  ip?: string;
  timestamp: number;
}

// Wrapper for all Kafka requests
export interface IKafkaRequest<T = unknown> {
  data: T;
  context: IKafkaRequestContext;
}

// Cookie action for response
export interface IKafkaCookieAction {
  action: 'set' | 'clear';
  name: string;
  value?: string;
  options?: {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    maxAge?: number;
    path?: string;
  };
}

// Standard Kafka response wrapper
export interface IKafkaResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    statusCode: number;
    message: string;
    error?: string;
  };
  cookies?: IKafkaCookieAction[];
}

// Helper function to create success response
export function createKafkaSuccess<T>(
  data: T,
  cookies?: IKafkaCookieAction[],
): IKafkaResponse<T> {
  return { success: true, data, cookies };
}

// Helper function to create error response
export function createKafkaError(
  statusCode: number,
  message: string,
  error?: string,
): IKafkaResponse<never> {
  return { success: false, error: { statusCode, message, error } };
}
