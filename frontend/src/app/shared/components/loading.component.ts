import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de Loading/Spinner
 */
@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isLoading"
      class="flex justify-center items-center py-8"
    >
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  `,
  styles: [],
})
export class LoadingComponent {
  @Input() isLoading = false;
}
