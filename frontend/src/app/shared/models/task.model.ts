/**
 * Enum para prioridades de tarefas
 */
export enum TaskPriority {
  Low = 0,
  Medium = 1,
  High = 2,
}

/**
 * Interface para representar uma Tarefa
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string | null;
  userId: string;
}

/**
 * DTO para criar uma nova tarefa
 */
export interface CreateTaskDto {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string | null;
  userId: string;
}

/**
 * DTO para atualizar uma tarefa
 */
export interface UpdateTaskDto {
  title: string;
  description: string;
  isCompleted: boolean;
  priority: TaskPriority;
  dueDate: string | null;
}

/**
 * Interface para filtro de tarefas
 */
export interface TaskFilter {
  status?: 'pending' | 'completed';
  priority?: TaskPriority;
  dueDate?: string;
}
