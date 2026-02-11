import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { AuthService } from '../../auth/services/auth.service';
import { Task, CreateTaskDto, UpdateTaskDto, TaskPriority } from '../../../shared/models';
import {
  ButtonComponent,
  AlertComponent,
  LoadingComponent,
  HeaderComponent,
} from '../../../shared/components';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * Página Dashboard de Tarefas
 */
@Component({
  selector: 'app-tasks-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    AlertComponent,
    LoadingComponent,
    HeaderComponent,
  ],
  template: `
    <app-header></app-header>

    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Formulário de Criação -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Nova Tarefa</h2>

            <form [formGroup]="taskForm" (ngSubmit)="createTask()" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  formControlName="title"
                  placeholder="Digite o título"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  formControlName="description"
                  placeholder="Digite a descrição"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Prioridade
                </label>
                <select
                  formControlName="priority"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option [value]="TaskPriority.Low">Baixa</option>
                  <option [value]="TaskPriority.Medium">Média</option>
                  <option [value]="TaskPriority.High">Alta</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Data de Vencimento
                </label>
                <input
                  type="datetime-local"
                  formControlName="dueDate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <app-button
                label="Criar Tarefa"
                type="submit"
                [disabled]="!taskForm.valid || isLoadingCreate"
                [isLoading]="isLoadingCreate"
                loadingText="Criando..."
              ></app-button>
            </form>

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
          </div>
        </div>

        <!-- Lista de Tarefas -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Minhas Tarefas</h2>

            <div class="mb-4 flex gap-2">
              <button
                (click)="setFilter('all')"
                [ngClass]="{ 'bg-primary-600 text-white': filter === 'all', 'bg-gray-200': filter !== 'all' }"
                class="px-4 py-2 rounded transition"
              >
                Todas
              </button>
              <button
                (click)="setFilter('pending')"
                [ngClass]="{ 'bg-primary-600 text-white': filter === 'pending', 'bg-gray-200': filter !== 'pending' }"
                class="px-4 py-2 rounded transition"
              >
                Pendentes
              </button>
              <button
                (click)="setFilter('completed')"
                [ngClass]="{ 'bg-primary-600 text-white': filter === 'completed', 'bg-gray-200': filter !== 'completed' }"
                class="px-4 py-2 rounded transition"
              >
                Concluídas
              </button>
            </div>

            <app-loading [isLoading]="isLoading"></app-loading>

            <div *ngIf="!isLoading && filteredTasks.length === 0" class="text-center py-8">
              <p class="text-gray-500 text-lg">Nenhuma tarefa encontrada</p>
            </div>

            <div *ngIf="!isLoading" class="space-y-4">
              <div
                *ngFor="let task of filteredTasks"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        [checked]="task.isCompleted"
                        (change)="toggleTask(task)"
                        class="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                      />
                      <h3
                        class="text-lg font-semibold"
                        [ngClass]="{ 'line-through text-gray-400': task.isCompleted }"
                      >
                        {{ task.title }}
                      </h3>
                      <span
                        class="px-2 py-1 rounded text-xs font-semibold text-white"
                        [ngClass]="getPriorityColor(task.priority)"
                      >
                        {{ getPriorityLabel(task.priority) }}
                      </span>
                    </div>
                    <p *ngIf="task.description" class="text-gray-600 mt-2">
                      {{ task.description }}
                    </p>
                    <p *ngIf="task.dueDate" class="text-sm text-gray-500 mt-2">
                      📅 {{ formatDate(task.dueDate) }}
                    </p>
                  </div>
                  <button
                    (click)="deleteTask(task.id)"
                    class="text-red-600 hover:text-red-800 transition ml-4"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class TasksDashboardComponent implements OnInit, OnDestroy {
  taskForm: FormGroup;
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: 'all' | 'pending' | 'completed' = 'all';
  isLoading = false;
  isLoadingCreate = false;
  errorMessage = '';
  successMessage = '';

  private destroy$ = new Subject<void>();
  TaskPriority = TaskPriority;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      priority: [TaskPriority.Medium],
      dueDate: [''],
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService
      .getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.applyFilter();
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Erro ao carregar tarefas';
          this.isLoading = false;
        },
      });
  }

  createTask(): void {
    if (!this.taskForm.valid) return;

    this.isLoadingCreate = true;
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.errorMessage = 'Usuário não autenticado';
      this.isLoadingCreate = false;
      return;
    }

    const createTaskDto: CreateTaskDto = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      priority: this.taskForm.value.priority,
      dueDate: this.taskForm.value.dueDate,
      userId: user.id,
    };

    this.taskService
      .createTask(createTaskDto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newTask) => {
          this.tasks.push(newTask);
          this.applyFilter();
          this.successMessage = 'Tarefa criada com sucesso!';
          this.taskForm.reset({ priority: TaskPriority.Medium });
          this.isLoadingCreate = false;
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: (err) => {
          this.errorMessage = 'Erro ao criar tarefa';
          this.isLoadingCreate = false;
        },
      });
  }

  toggleTask(task: Task): void {
    const updateDto: UpdateTaskDto = {
      title: task.title,
      description: task.description,
      isCompleted: !task.isCompleted,
      priority: task.priority,
      dueDate: task.dueDate,
    };

    this.taskService
      .updateTask(task.id, updateDto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex((t) => t.id === task.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
            this.applyFilter();
          }
        },
        error: (err) => {
          this.errorMessage = 'Erro ao atualizar tarefa';
        },
      });
  }

  deleteTask(id: string): void {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      this.taskService
        .deleteTask(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.tasks = this.tasks.filter((t) => t.id !== id);
            this.applyFilter();
            this.successMessage = 'Tarefa deletada com sucesso!';
            setTimeout(() => (this.successMessage = ''), 3000);
          },
          error: (err) => {
            this.errorMessage = 'Erro ao deletar tarefa';
          },
        });
    }
  }

  setFilter(newFilter: 'all' | 'pending' | 'completed'): void {
    this.filter = newFilter;
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      if (this.filter === 'pending') return !task.isCompleted;
      if (this.filter === 'completed') return task.isCompleted;
      return true;
    });
  }

  getPriorityLabel(priority: TaskPriority): string {
    const labels = {
      [TaskPriority.Low]: 'Baixa',
      [TaskPriority.Medium]: 'Média',
      [TaskPriority.High]: 'Alta',
    };
    return labels[priority];
  }

  getPriorityColor(priority: TaskPriority): string {
    const colors = {
      [TaskPriority.Low]: 'bg-green-600',
      [TaskPriority.Medium]: 'bg-yellow-600',
      [TaskPriority.High]: 'bg-red-600',
    };
    return colors[priority];
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  }
}
