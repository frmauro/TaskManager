import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Interceptor para tratamento global de erros HTTP
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Um erro desconhecido ocorreu';

        if (error.error instanceof ErrorEvent) {
          // Erro do lado do cliente
          errorMessage = `Erro: ${error.error.message}`;
        } else {
          // Erro do lado do servidor
          errorMessage =
            error.error?.message ||
            `Erro do servidor: ${error.status} ${error.statusText}`;

          // Log de erro para debugging
          console.error(
            'Erro HTTP:',
            error.status,
            'Mensagem:',
            errorMessage
          );
        }

        return throwError(() => ({
          message: errorMessage,
          status: error.status,
          error: error.error,
        }));
      })
    );
  }
}
