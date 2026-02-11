# Estrutura do Projeto Frontend - TaskManager

## Árvore de Diretórios Completa

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts           # Guard para proteger rotas autenticadas
│   │   │   │   └── index.ts                # Arquivo barrel
│   │   │   ├── interceptors/
│   │   │   │   ├── jwt.interceptor.ts      # Adiciona token JWT às requisições
│   │   │   │   ├── error.interceptor.ts    # Tratamento global de erros HTTP
│   │   │   │   └── index.ts                # Arquivo barrel
│   │   │   └── services/
│   │   │       └── api.service.ts          # Serviço base para chamadas HTTP
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── pages/
│   │   │   │   │   └── login.component.ts  # Página de login
│   │   │   │   └── services/
│   │   │   │       └── auth.service.ts     # Serviço de autenticação
│   │   │   └── tasks/
│   │   │       ├── pages/
│   │   │       │   └── tasks-dashboard.component.ts  # Dashboard de tarefas
│   │   │       ├── components/             # Componentes específicos de tarefas
│   │   │       └── services/
│   │   │           └── task.service.ts     # Serviço de tarefas
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── header.component.ts     # Cabeçalho da aplicação
│   │   │   │   ├── loading.component.ts    # Componente de loading
│   │   │   │   ├── button.component.ts     # Botão reutilizável
│   │   │   │   ├── input.component.ts      # Input reutilizável
│   │   │   │   ├── alert.component.ts      # Alerta/Mensagem reutilizável
│   │   │   │   └── index.ts                # Arquivo barrel
│   │   │   ├── models/
│   │   │   │   ├── task.model.ts           # Interfaces de Task
│   │   │   │   ├── auth.model.ts           # Interfaces de Auth
│   │   │   │   ├── api.model.ts            # Interfaces gerais de API
│   │   │   │   └── index.ts                # Arquivo barrel
│   │   │   └── utils/                      # Utilitários e helpers
│   │   ├── app.ts                          # Componente raiz
│   │   ├── app.css                         # Estilos globais do app
│   │   ├── app.routes.ts                   # Definição de rotas
│   │   └── app.config.ts                   # Configuração da aplicação
│   ├── environments/
│   │   ├── environment.ts                  # Configurações de desenvolvimento
│   │   └── environment.prod.ts             # Configurações de produção
│   ├── main.ts                             # Ponto de entrada da aplicação
│   ├── index.html                          # HTML principal
│   └── styles.css                          # Estilos globais com Tailwind
├── tailwind.config.js                      # Configuração do Tailwind CSS
├── postcss.config.js                       # Configuração do PostCSS
├── tsconfig.json                           # Configuração do TypeScript
├── tsconfig.app.json                       # Configuração específica para app
├── angular.json                            # Configuração do Angular CLI
├── package.json                            # Dependências do projeto
└── README_FRONTEND.md                      # Documentação do frontend
```

## Padrões de Implementação

### 1. Componentes Standalone
Todos os componentes utilizam a sintaxe `standalone: true`, eliminando a necessidade de NgModules:

```typescript
@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `...`,
  styles: [],
})
export class ComponentName {
  // ...
}
```

### 2. Arquivos Barrel (index.ts)
Usados para simplificar imports:

```typescript
// Em: shared/components/index.ts
export * from './header.component';
export * from './loading.component';
// ...

// Uso:
import { HeaderComponent, LoadingComponent } from '@app/shared/components';
```

### 3. Tipagem com TypeScript
Interfaces bem definidas para todos os modelos:

```typescript
export interface Task {
  id: string;
  title: string;
  // ...
}

export enum TaskPriority {
  Low = 0,
  Medium = 1,
  High = 2,
}
```

### 4. Reatividade com RxJS
Uso de Observables para gerenciamento de estado:

```typescript
public tasks$ = this.taskService.getTasks().pipe(
  map(tasks => tasks.filter(t => !t.isCompleted)),
  shareReplay(1)
);
```

### 5. Validação de Formulários
Uso de Reactive Forms com validação:

```typescript
this.taskForm = this.fb.group({
  title: ['', [Validators.required, Validators.minLength(3)]],
  description: [''],
  priority: [TaskPriority.Medium],
  dueDate: [''],
});
```

## Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────┐
│                       Component (View)                           │
│  - login.component.ts                                            │
│  - tasks-dashboard.component.ts                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Services (Business Logic)                     │
│  - auth.service.ts                                               │
│  - task.service.ts                                               │
│  - api.service.ts                                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  HttpClient (Communication)                      │
│  - with Interceptors (JWT + Error Handler)                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Backend API (REST)                              │
│  - http://localhost:5000/api                                     │
└─────────────────────────────────────────────────────────────────┘
```

## Interceptors Pipeline

```
1. Requisição HTTP
        ↓
2. JwtInterceptor
   - Adiciona token ao header Authorization
   - Valida expiração do token
        ↓
3. HttpClient faz a requisição
        ↓
4. Resposta/Erro
        ↓
5. ErrorInterceptor (se erro)
   - Trata erros 401
   - Loga erros
   - Padroniza formato de erro
        ↓
6. Retorna ao Service
```

## Rotas da Aplicação

```
/                    → Redireciona para /tasks
/login               → Página de login (sem autenticação)
/tasks               → Dashboard de tarefas (com autenticação)
/**                  → Redireciona para /tasks
```

## Variáveis de Ambiente

### Development (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
};
```

### Production (environment.prod.ts)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.taskmanager.com/api',
};
```

## Estilos com Tailwind CSS

- **Customizações**: `tailwind.config.js`
- **Cores primárias**: Palette azul personalizada
- **Temas**: Suporte a light/dark mode (pronto para extensão)
- **Componentes**: Botões, inputs, alertas com variantes

## LocalStorage

Chaves usadas para persistência:
- `auth_token` - Token JWT
- `refresh_token` - Token de renovação

## Performance e Otimizações

1. **Change Detection**: OnPush strategy (pronto para implementação)
2. **Unsubscribe**: Uso de `takeUntil` com `destroy$`
3. **Lazy Loading**: Estrutura pronta para feature modules
4. **Tree-shaking**: Componentes standalone reduzem bundle size
5. **Caching**: Possibilidade de cache com shareReplay()

## Boas Práticas Implementadas

✅ Separação de responsabilidades (Core/Features/Shared)
✅ Componentes reutilizáveis com inputs/outputs
✅ Tipagem forte com TypeScript
✅ Tratamento de erros centralizado
✅ Gestão de estado com RxJS
✅ Guards de rota para proteção
✅ Interceptors para funcionalidades cross-cutting
✅ Validação de formulários reativa
✅ Código documentado com comentários
✅ Responsive design com Tailwind CSS
