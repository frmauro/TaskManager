# TaskManager

Projeto exemplo: Task Manager (Front-end + Back-end) — arquitetura proposta.

## Estrutura
```
.
├── backend/
│   ├── TaskManager.Api (Web API)
│   ├── TaskManager.Application (Services, DTOs)
│   ├── TaskManager.Domain (Entities)
│   ├── TaskManager.Infrastructure (EF, Data Access)
│   └── TaskManager.Tests (Unit Tests)
├── frontend/
│   └── task-manager-frontend (Angular 19+)
└── docs/ (Documentação)
```

## Executando localmente

### 1. Backend (.NET 8)
```bash
cd backend/TaskManager.Api
dotnet restore
dotnet ef database update -p ../TaskManager.Infrastructure -s .
dotnet run
```

API rodará em: `http://localhost:5000` (ou `https://localhost:5001`)

**Credenciais padrão**:
- Email: `admin@example.com`
- Senha: `Admin@123`

### 2. Front-end (Angular 19+)
```bash
cd frontend/task-manager-frontend
npm install
npm run start
```

Frontend rodará em: `http://localhost:4200`

## Recursos principais

✅ **Autenticação JWT** com refresh tokens  
✅ **CRUD de Tarefas** (criar, listar, editar, deletar)  
✅ **Filtros por Status, Prioridade e Data**  
✅ **Validações** (FluentValidation no backend, Reactive Forms no frontend)  
✅ **Logging estruturado** (ILogger no backend)  
✅ **Tratamento global de erros** (middleware no backend, interceptors no frontend)  
✅ **Segurança** (CORS, AuthGuard, role-based)  
✅ **Testes unitários** (xUnit)

## Documentação

- [Arquitetura](./docs/architecture.md)
- [Exemplos de API](./docs/API_EXAMPLES.md)