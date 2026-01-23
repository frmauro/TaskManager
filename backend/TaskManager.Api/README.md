# TaskManager API

## Requisitos
- .NET 8 SDK
- MySQL

## Configuração
A connection string está em `appsettings.json` (exemplo já fornecido). Em produção, prefira usar variáveis de ambiente.

## Migrations
Para criar a migration inicial e atualizar o banco:

1. `dotnet tool install --global dotnet-ef` (se necessário)
2. `cd backend/TaskManager.Api`
3. `dotnet ef migrations add InitialCreate -o Migrations`
4. `dotnet ef database update`

> Se preferir, pode rodar a aplicação que já chama `db.Database.Migrate()` na inicialização para aplicar migrations.

## Run
`dotnet run` (na pasta `backend/TaskManager.Api`)

## Notas
- JWT: `appsettings.json` tem um secret de exemplo; altere antes de usar em produção.
- Seed: um usuário admin é criado automaticamente se o banco estiver vazio (email: `admin@example.com`, senha: `Admin@123`).