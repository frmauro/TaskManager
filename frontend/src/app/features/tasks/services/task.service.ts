import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, CreateTaskDto, UpdateTaskDto } from '../../../shared/models';
import { ApiService } from '../../../core/services/api.service';
import { environment } from '../../../../environments/environment';

/**
 * Serviço responsável por gerenciar operações com tarefas
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;
  private endpoint = 'tasks';

  constructor(private apiService: ApiService, private http: HttpClient) {}

  /**
   * Obtém todas as tarefas
   */
  getTasks(): Observable<Task[]> {
    return this.apiService.get<Task[]>(this.endpoint);
  }

  /**
   * Obtém uma tarefa específica por ID
   */
  getTaskById(id: string): Observable<Task> {
    return this.apiService.get<Task>(`${this.endpoint}/${id}`);
  }

  /**
   * Cria uma nova tarefa
   */
  createTask(task: CreateTaskDto): Observable<Task> {
    return this.apiService.post<Task>(this.endpoint, task);
  }

  /**
   * Atualiza uma tarefa existente
   */
  updateTask(id: string, task: UpdateTaskDto): Observable<Task> {
    return this.apiService.put<Task>(`${this.endpoint}/${id}`, task);
  }

  /**
   * Marca uma tarefa como concluída
   */
  completeTask(id: string): Observable<Task> {
    return this.apiService.put<Task>(`${this.endpoint}/${id}`, {
      isCompleted: true,
    });
  }

  /**
   * Marca uma tarefa como não concluída
   */
  uncompleteTask(id: string): Observable<Task> {
    return this.apiService.put<Task>(`${this.endpoint}/${id}`, {
      isCompleted: false,
    });
  }

  /**
   * Deleta uma tarefa
   */
  deleteTask(id: string): Observable<any> {
    return this.apiService.delete<any>(`${this.endpoint}/${id}`);
  }
}
