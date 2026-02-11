import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de Button reutilizável
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || isLoading"
      [ngClass]="getButtonClasses()"
      (click)="onClick()"
    >
      <span *ngIf="!isLoading">{{ label }}</span>
      <span *ngIf="isLoading" class="flex items-center space-x-2">
        <span class="animate-spin">⏳</span>
        <span>{{ loadingText }}</span>
      </span>
    </button>
  `,
  styles: [],
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled = false;
  @Input() isLoading = false;
  @Input() loadingText = 'Carregando...';
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.isLoading) {
      this.clicked.emit();
    }
  }

  getButtonClasses(): string {
    const baseClasses =
      'px-4 py-2 rounded font-medium transition disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
      primary:
        'bg-primary-600 text-white hover:bg-primary-700 disabled:hover:bg-primary-600',
      secondary:
        'bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:hover:bg-gray-300',
      danger:
        'bg-red-600 text-white hover:bg-red-700 disabled:hover:bg-red-600',
    };

    return `${baseClasses} ${variantClasses[this.variant]}`;
  }
}
