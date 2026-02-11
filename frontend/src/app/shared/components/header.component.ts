import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

/**
 * Componente de Header da aplicação
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-primary-600 text-white shadow-lg">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <h1 class="text-2xl font-bold">📋 TaskManager</h1>
        </div>
        <nav class="flex items-center space-x-6">
          <a href="/tasks" class="hover:text-primary-200 transition">Tasks</a>
          <button
            (click)="onLogout()"
            class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  @Input() userName: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
