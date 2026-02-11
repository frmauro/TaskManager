/**
 * Interface para respostas de erro da API
 */
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: { [key: string]: string[] };
  timestamp: string;
}

/**
 * Interface para resposta genérica da API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}
