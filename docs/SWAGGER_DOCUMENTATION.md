# Swagger Documentation - Task Manager API

## Visão Geral

A API Task Manager foi configurada com **Swagger/Swashbuckle** para gerar documentação interativa e permitir testes diretos dos endpoints.

## Acessando o Swagger

A documentação interativa do Swagger está disponível em:

```
http://localhost:5000
```

Você será redirecionado para a interface Swagger UI onde pode:
- Visualizar todos os endpoints disponíveis
- Ver descrições detalhadas de cada operação
- Visualizar modelos de requisição e resposta
- Testar os endpoints diretamente na interface

## Autenticação com JWT

### 1. Login para obter o Token

1. Abra o Swagger UI em `http://localhost:5000`
2. Expanda o controlador `Auth` clicando nele
3. Clique em `POST /api/auth/login`
4. Clique no botão "Try it out"
5. Insira as credenciais de teste:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

6. Clique em "Execute"
7. Copie o valor de `accessToken` da resposta

### 2. Usar o Token para Acessar Endpoints Protegidos

#### Opção A: Via Botão Authorize

1. Localize o botão **"Authorize"** no canto superior direito do Swagger UI
2. Clique nele
3. Uma modal de diálogo aparecerá
4. Cole o token no campo "Value" com o prefixo `Bearer `:

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. Clique em "Authorize"
6. Agora todos os endpoints protegidos estarão autorizados

#### Opção B: Manualmente em Cada Requisição

Para endpoints com `[Authorize]`, você pode adicionar o header manualmente:

1. Clique em "Try it out" para qualquer endpoint protegido
2. Localize a seção "Headers"
3. Adicione o header:
   - **Name:** `Authorization`
   - **Value:** `Bearer YOUR_ACCESS_TOKEN`

## Estrutura dos Controladores

### AuthController
- **POST `/api/auth/login`** - Realiza login e retorna tokens JWT
- **POST `/api/auth/refresh`** - Renova o token de acesso usando um refresh token

### TasksController (Requer Autorização)
- **GET `/api/tasks`** - Obtém todas as tarefas do usuário
- **GET `/api/tasks/{id}`** - Obtém uma tarefa específica
- **POST `/api/tasks`** - Cria uma nova tarefa
- **PUT `/api/tasks/{id}`** - Atualiza uma tarefa existente
- **DELETE `/api/tasks/{id}`** - Deleta uma tarefa

## Formato do Token JWT

O token JWT inclui as seguintes claims:

```json
{
  "sub": "user-id-uuid",
  "email": "user@example.com",
  "name": "Nome do Usuário",
  "role": "Admin|User"
}
```

## Códigos de Resposta HTTP

- **200 OK** - Requisição bem-sucedida
- **201 Created** - Recurso criado com sucesso
- **204 No Content** - Operação bem-sucedida sem conteúdo na resposta
- **400 Bad Request** - Dados inválidos na requisição
- **401 Unauthorized** - Usuário não autenticado ou token inválido
- **404 Not Found** - Recurso não encontrado
- **500 Internal Server Error** - Erro no servidor

## Exemplo de Fluxo Completo

### 1. Login
```bash
curl -X POST "http://localhost:5000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Resposta:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "Yd3aw2xbqY+5YY5+i+hY3Q==",
  "expiresAt": "2026-01-08T15:30:00Z"
}
```

### 2. Obter Tarefas
```bash
curl -X GET "http://localhost:5000/api/tasks" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 3. Criar Tarefa
```bash
curl -X POST "http://localhost:5000/api/tasks" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Minha Tarefa",
    "description": "Descrição da tarefa",
    "dueDate": "2026-01-15T00:00:00Z",
    "priority": "High",
    "status": "Todo"
  }'
```

## Configuração

A configuração do Swagger está em [Program.cs](../backend/TaskManager.Api/Program.cs) com:

- **Definição de Segurança JWT** - Configurado com suporte ao Bearer token
- **Informações da API** - Título, versão e descrição
- **Documentação XML** - Comentários dos controladores incluídos na documentação
- **UI Personalizada** - Swagger UI servido na raiz da aplicação

## Troubleshooting

### Swagger não carrega
- Verifique se a API está rodando: `http://localhost:5000`
- Verifique se não há erro de porta em uso
- Limpe o cache do navegador

### Autorização não funciona
- Certifique-se de colar o token corretamente no campo Authorize
- Inclua o prefixo `Bearer ` antes do token
- Verifique se o token não expirou (verifique `expiresAt`)
- Use `/api/auth/refresh` para obter um novo token

### Documentação XML não aparece
- Compile o projeto: `dotnet build`
- A documentação é gerada em `bin/Debug/net8.0/TaskManager.Api.xml`

## Referências

- [Swagger/Swashbuckle Documentation](https://github.com/domaindrivendev/Swashbuckle.AspNetCore)
- [JWT Bearer Token Scheme](https://swagger.io/docs/specification/authentication/bearer-authentication/)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
