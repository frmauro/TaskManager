import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type AlertType = 'success' | 'error' | 'warning' | 'info';

/**
 * Componente de Alert/Mensagem reutilizável
 */
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" [ngClass]="getAlertClasses()">
      <div class="flex items-center space-x-2">
        <span>{{ getIcon() }}</span>
        <p>{{ message }}</p>
      </div>
    </div>
  `,
  styles: [],
})
export class AlertComponent {
  @Input() message = '';
  @Input() type: AlertType = 'info';

  getAlertClasses(): string {
    const baseClasses = 'p-4 rounded-md';

    const typeClasses = {
      success: 'bg-green-100 text-green-800 border border-green-300',
      error: 'bg-red-100 text-red-800 border border-red-300',
      warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
      info: 'bg-blue-100 text-blue-800 border border-blue-300',
    };

    return `${baseClasses} ${typeClasses[this.type]}`;
  }

  getIcon(): string {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };

    return icons[this.type];
  }
}
