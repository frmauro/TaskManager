# Arquitetura (Visão Geral)

- Front-end: Angular 19+ (Standalone components, Tailwind, Reactive Forms)
- Back-end: .NET 8 (ASP.NET Core Web API), EF Core + MySQL

Camadas do back-end:
- API (Controllers)
- Application (Services, DTOs)
- Domain (Entities)
- Infrastructure (EF, Repositories, Migrations)

Autenticação: JWT
CORS: configurado para `http://localhost:4200`

Endpoints principais:
- POST /api/auth/login
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/{id}
- DELETE /api/tasks/{id}

Diagrama: adicione o diagrama visual nesta pasta (`docs/architecture.png`) se desejar.
