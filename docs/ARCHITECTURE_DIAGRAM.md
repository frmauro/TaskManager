# Diagrama Arquitetural - Task Manager

## Visão Geral da Solução

```mermaid
graph TB
    subgraph Frontend["Frontend (Angular 19+)"]
        A[UI/Components<br/>Tailwind CSS]
        B[Pages<br/>Login, Tasks]
        C[Services<br/>AuthService, ApiService]
        D[Interceptors<br/>JWT, Error Handler]
        A --> B --> C
        C --> D
    end

    subgraph Backend["Backend (.NET 8 API)"]
        subgraph API["API Layer"]
            E[Controllers<br/>Auth, Tasks]
        end
        
        subgraph Application["Application Layer"]
            F[Services<br/>TaskService]
            G[DTOs & Validators<br/>FluentValidation]
            H[AutoMapper<br/>Profiles]
        end
        
        subgraph Domain["Domain Layer"]
            I[Entities<br/>User, Task]
            J[Enums<br/>Priority, Role]
        end
        
        subgraph Infrastructure["Infrastructure Layer"]
            K[EF Core DbContext<br/>Migrations]
            L[Repositories<br/>ITaskRepository]
            M[Middleware<br/>Error Handler, JWT]
        end
        
        E --> F --> L
        F --> G --> H
        L --> K
        K --> I --> J
        M -.-> E
    end

    subgraph Database["Data Layer"]
        N[(MySQL<br/>Users, Tasks)]
    end

    subgraph Auth["Authentication & Security"]
        O[JWT Token<br/>HS256]
        P[Refresh Tokens<br/>In-Memory Store]
        Q[CORS Policy<br/>localhost:4200]
    end

    D -->|HTTP + JWT| M
    M -->|Validates Token| O
    O -.->|Generate/Refresh| P
    E -->|Auth Check| O
    L -->|CRUD Operations| N
    Q -.->|Enable Access| Frontend
    
    style Frontend fill:#4A90E2,stroke:#2E5C8A,color:#fff
    style Backend fill:#7ED321,stroke:#5A9D1B,color:#fff
    style Database fill:#F5A623,stroke:#B88112,color:#fff
    style Auth fill:#E94B3C,stroke:#B53628,color:#fff
    style API fill:#50C7B8
    style Application fill:#50C7B8
    style Domain fill:#50C7B8
    style Infrastructure fill:#50C7B8
```

---

## Fluxo de Requisição - Autenticação

```mermaid
sequenceDiagram
    actor User
    participant Frontend as Angular App
    participant AuthCtrl as Auth Controller
    participant AuthSvc as Auth Service
    participant DB as MySQL
    participant JWT as JWT Engine

    User->>Frontend: Clica "Entrar"
    Frontend->>AuthCtrl: POST /api/auth/login (email, password)
    AuthCtrl->>AuthSvc: Valida credenciais
    AuthSvc->>DB: Busca usuário por email
    DB-->>AuthSvc: Retorna user + hash
    AuthSvc->>AuthSvc: BCrypt.Verify(password)
    
    alt Credenciais Válidas
        AuthSvc->>JWT: Gera Access Token (15 min)
        JWT-->>AuthSvc: Token assinado
        AuthSvc->>JWT: Gera Refresh Token (7h)
        JWT-->>AuthSvc: Token aleatório
        AuthSvc-->>AuthCtrl: TokenResponse
        AuthCtrl-->>Frontend: {accessToken, refreshToken, expiresAt}
        Frontend->>Frontend: localStorage.setItem('token')
        Frontend-->>User: Redireciona para /tasks
    else Credenciais Inválidas
        AuthSvc-->>AuthCtrl: Unauthorized
        AuthCtrl-->>Frontend: 401 Credenciais inválidas
        Frontend-->>User: Exibe erro
    end
```

---

## Fluxo de Requisição - Obter Tarefas

```mermaid
sequenceDiagram
    participant Frontend as Angular App
    participant Interceptor as JWT Interceptor
    participant TaskCtrl as Tasks Controller
    participant TaskSvc as Task Service
    participant Mapper as AutoMapper
    participant DB as MySQL

    Frontend->>Frontend: Carrega tarefas (ngOnInit)
    Frontend->>Interceptor: GET /api/tasks
    Interceptor->>Interceptor: Anexa Authorization: Bearer {token}
    Interceptor->>TaskCtrl: Envia request com JWT
    
    TaskCtrl->>TaskCtrl: Extrai userId do JWT claim
    TaskCtrl->>TaskSvc: GetAllAsync(userId)
    TaskSvc->>DB: SELECT * FROM Tasks WHERE UserId = ?
    DB-->>TaskSvc: Lista de TaskEntities
    TaskSvc->>Mapper: Map TaskEntity[] → TaskDto[]
    Mapper-->>TaskSvc: TaskDto[]
    TaskSvc-->>TaskCtrl: TaskDto[]
    TaskCtrl-->>Frontend: 200 OK {tasks[]}
    
    Frontend->>Frontend: Atualiza component.tasks
    Frontend-->>Frontend: Renderiza TaskList
```

---

## Estrutura de Pastas

```
TaskManager/
├── backend/
│   ├── TaskManager.Api/
│   │   ├── Controllers/
│   │   │   ├── AuthController.cs
│   │   │   └── TasksController.cs
│   │   ├── Middleware/
│   │   │   └── ErrorHandlingMiddleware.cs
│   │   ├── Program.cs
│   │   ├── appsettings.json
│   │   └── TaskManager.Api.csproj
│   ├── TaskManager.Application/
│   │   ├── DTOs/
│   │   ├── Interfaces/
│   │   ├── Services/
│   │   ├── Profiles/
│   │   ├── Validators/
│   │   └── TaskManager.Application.csproj
│   ├── TaskManager.Domain/
│   │   ├── Entities/
│   │   │   ├── User.cs (+ UserRole enum)
│   │   │   └── TaskEntity.cs
│   │   └── TaskManager.Domain.csproj
│   ├── TaskManager.Infrastructure/
│   │   ├── Data/
│   │   │   ├── AppDbContext.cs
│   │   │   └── RefreshTokenStore.cs
│   │   ├── Migrations/
│   │   ├── Repositories/
│   │   ├── Seed/
│   │   └── TaskManager.Infrastructure.csproj
│   └── TaskManager.Tests/
│       ├── TaskServiceTests.cs
│       └── TaskManager.Tests.csproj
│
├── frontend/
│   └── task-manager-frontend/
│       ├── src/
│       │   ├── app/
│       │   │   ├── app.component.ts (navbar + router)
│       │   │   ├── app.routes.ts
│       │   │   ├── pages/
│       │   │   │   ├── login/
│       │   │   │   └── tasks/
│       │   │   ├── components/
│       │   │   │   ├── task-list/
│       │   │   │   └── task-form/
│       │   │   ├── services/
│       │   │   │   ├── api.service.ts
│       │   │   │   └── auth.service.ts
│       │   │   ├── guards/
│       │   │   │   └── auth.guard.ts
│       │   │   ├── interceptors/
│       │   │   │   ├── jwt.interceptor.ts
│       │   │   │   └── error.interceptor.ts
│       │   │   └── models/
│       │   │       └── task.model.ts
│       │   ├── main.ts
│       │   ├── index.html
│       │   └── styles.css (Tailwind)
│       ├── package.json
│       ├── tailwind.config.js
│       └── angular.json
│
└── docs/
    ├── architecture.md
    ├── API_EXAMPLES.md
    └── DIAGRAM.md (este arquivo)
```

---

## Stack Tecnológico

### Frontend
- **Framework**: Angular 19+ (Standalone Components)
- **Styling**: Tailwind CSS
- **HTTP**: HttpClient + RxJS
- **Forms**: Reactive Forms (FormBuilder, Validators)
- **Routing**: Angular Router com AuthGuard
- **Interceptors**: JWT + Error Handler

### Backend
- **Runtime**: .NET 8
- **Framework**: ASP.NET Core Web API (Minimal APIs)
- **ORM**: Entity Framework Core 9.0
- **Database**: MySQL 8.0+
- **Auth**: JWT Bearer + Refresh Tokens
- **Validation**: FluentValidation
- **Mapping**: AutoMapper
- **Logging**: ILogger (ASP.NET Core built-in)
- **Testing**: xUnit

### Arquitetura
- **Padrão**: Layered Architecture (API, Application, Domain, Infrastructure)
- **SOLID**: DI, SRP, ISP
- **Segurança**: CORS, JWT, BCrypt
- **Error Handling**: Global middleware + HTTP interceptors
- **Database**: Migrations automáticas com EF Core

---

## Endpoints Disponíveis

| Method | Endpoint | Auth | Descrição |
|--------|----------|------|-----------|
| POST | `/api/auth/login` | ❌ | Autentica usuário e retorna tokens |
| POST | `/api/auth/refresh` | ❌ | Renova access token usando refresh token |
| GET | `/api/tasks` | ✅ | Lista todas as tarefas do usuário |
| GET | `/api/tasks/{id}` | ✅ | Obtém detalhes de uma tarefa |
| POST | `/api/tasks` | ✅ | Cria nova tarefa |
| PUT | `/api/tasks/{id}` | ✅ | Atualiza tarefa |
| DELETE | `/api/tasks/{id}` | ✅ | Deleta tarefa |

---

## Fluxo de Ciclo de Vida

1. **Inicialização Frontend**
   - `main.ts` → bootstrapApplication
   - Registra rotas, HTTP interceptors, provedores
   - AuthService verifica localStorage por token existente

2. **Login**
   - Usuário acessa `/login`
   - Envia credenciais → Backend valida
   - Recebe `accessToken` + `refreshToken`
   - Armazena em localStorage
   - Redireciona para `/tasks`

3. **Requisição Protegida**
   - JwtInterceptor anexa `Authorization: Bearer {token}`
   - Backend valida JWT signature
   - Extrai userId do claim `sub`
   - Processa requisição com escopo do usuário

4. **Expiração de Token**
   - Frontend detecta 401 via ErrorInterceptor
   - Chama `/api/auth/refresh` com refreshToken
   - Obtém novo accessToken
   - Retenta requisição original
   - Se refresh falhar → logout + redireciona para /login

5. **Encerramento**
   - Usuário clica "Logout"
   - `AuthService.logout()` limpa localStorage
   - ErrorInterceptor redireciona para /login

---

## Segurança

```
┌─────────────────────────────────────────────────────┐
│                  CAMADAS DE SEGURANÇA                │
├─────────────────────────────────────────────────────┤
│ 1. CORS Policy → Apenas localhost:4200 permitido    │
│ 2. JWT Bearer → Todas requisições (exceto login)    │
│ 3. BCrypt → Hashing de senhas (admin@/Admin@123)    │
│ 4. AuthGuard → Proteção de rotas no frontend        │
│ 5. [Authorize] → Proteção de endpoints no backend   │
│ 6. Refresh Tokens → Renovação segura de access      │
│ 7. Error Handling → Sem exposição de stack traces   │
└─────────────────────────────────────────────────────┘
```

---

## Escalabilidade Futura

- [ ] Implementar banco de dados para refresh tokens (segurança)
- [ ] Adicionar caching (Redis) para tarefas frequentes
- [ ] Rate limiting nos endpoints (preventivo de abuso)
- [ ] Auditoria de ações (log em DB)
- [ ] Suporte a múltiplos usuários com compartilhamento de tarefas
- [ ] WebSockets para notificações real-time
- [ ] CI/CD (GitHub Actions / Azure Pipelines)
- [ ] Docker + Kubernetes
- [ ] API Versioning (v1, v2, etc.)
- [ ] OpenAPI/Swagger documentation