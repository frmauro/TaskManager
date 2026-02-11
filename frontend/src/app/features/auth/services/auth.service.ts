import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthResponse, LoginDto, RefreshTokenDto, User } from '../../../shared/models';
import { environment } from '../../../../environments/environment';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Serviço responsável por gerenciar autenticação e tokens JWT
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  /**
   * Realiza login com email e senha
   */
  login(credentials: LoginDto): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((response) => {
          this.setTokens(response.token, response.refreshToken);
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  /**
   * Realiza logout
   */
  logout(): void {
    this.clearTokens();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Atualiza o token JWT usando o refresh token
   */
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return new Observable((observer) => {
        observer.error('Refresh token não disponível');
      });
    }

    const dto: RefreshTokenDto = { refreshToken };
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, dto).pipe(
      tap((response) => {
        this.setTokens(response.token, response.refreshToken);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  /**
   * Obtém o token JWT atual
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Obtém o refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Obtém o usuário atual
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Define os tokens no localStorage
   */
  private setTokens(token: string, refreshToken: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  /**
   * Remove os tokens do localStorage
   */
  private clearTokens(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  /**
   * Verifica o status de autenticação ao iniciar a aplicação
   */
  private checkAuthStatus(): void {
    const token = this.getToken();
    if (token) {
      this.isAuthenticatedSubject.next(true);
      // Aqui você pode adicionar lógica para recuperar o usuário atual
    }
  }
}
