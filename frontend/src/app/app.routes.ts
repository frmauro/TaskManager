import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login.component';
import { TasksDashboardComponent } from './features/tasks/pages/tasks-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'tasks',
    component: TasksDashboardComponent,
  },
  {
    path: '**',
    redirectTo: '/tasks',
  },
];
