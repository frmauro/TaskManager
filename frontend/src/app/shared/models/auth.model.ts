/**
 * Interface para representar um Usuário
 */
export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

/**
 * DTO para login
 */
export interface LoginDto {
  email: string;
  password: string;
}

/**
 * DTO para refresh token
 */
export interface RefreshTokenDto {
  refreshToken: string;
}

/**
 * Interface para resposta de autenticação
 */
export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

/**
 * Interface para armazenar dados de autenticação
 */
export interface AuthTokens {
  token: string;
  refreshToken: string;
}
