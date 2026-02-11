import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../../../shared/models';
import {
  ButtonComponent,
  InputComponent,
  AlertComponent,
} from '../../../shared/components';

/**
 * Página de Login
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    AlertComponent,
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-primary-600 mb-2">📋</h1>
          <h2 class="text-3xl font-bold text-gray-800">TaskManager</h2>
          <p class="text-gray-600 mt-2">Gerencie suas tarefas com facilidade</p>
        </div>

        <app-alert
          *ngIf="errorMessage"
          [message]="errorMessage"
          type="error"
        ></app-alert>

        <app-alert
          *ngIf="successMessage"
          [message]="successMessage"
          type="success"
        ></app-alert>

        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <app-input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            [(ngModel)]="credentials.email"
            name="email"
            [required]="true"
          ></app-input>

          <app-input
            label="Senha"
            type="password"
            placeholder="••••••••"
            [(ngModel)]="credentials.password"
            name="password"
            [required]="true"
          ></app-input>

          <div class="mt-6">
            <app-button
              label="Entrar"
              type="submit"
              [isLoading]="isLoading"
              loadingText="Entrando..."
              class="w-full block"
            ></app-button>
          </div>
        </form>

        <div class="mt-6 p-4 bg-gray-100 rounded-md">
          <p class="text-sm text-gray-600">
            <strong>Dados de teste:</strong>
          </p>
          <p class="text-sm text-gray-600 mt-2">
            Email: <code class="bg-gray-200 px-2 py-1">admin@example.com</code>
          </p>
          <p class="text-sm text-gray-600">
            Senha: <code class="bg-gray-200 px-2 py-1">Admin@123</code>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  credentials: LoginDto = {
    email: '',
    password: '',
  };
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.logout();
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Por favor, preencha todos os campos';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.successMessage = 'Login realizado com sucesso!';
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 1000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.message || 'Falha ao fazer login. Tente novamente.';
      },
    });
  }
}
