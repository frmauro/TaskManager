# API Examples

## Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "Admin@123"
  }'
```

Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "base64-encoded-token",
  "expiresAt": "2026-01-08T15:00:00Z"
}
```

## Refresh Token
```bash
curl -X POST http://localhost:5000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "base64-encoded-token"
  }'
```

## Get All Tasks
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <access-token>"
```

## Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implementar autenticação",
    "description": "Adicionar JWT auth com refresh tokens",
    "priority": "High",
    "dueDate": "2026-01-15"
  }'
```

## Update Task
```bash
curl -X PUT http://localhost:5000/api/tasks/{id} \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implementar autenticação",
    "description": "JWT auth com refresh tokens (atualizado)",
    "isCompleted": false,
    "priority": "High",
    "dueDate": "2026-01-15"
  }'
```

## Delete Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/{id} \
  -H "Authorization: Bearer <access-token>"
```

---

## Postman Collection (alternativo)

Importe no Postman:
- **Base URL**: `http://localhost:5000/api`
- **Auth**: Bearer token (salvo em variável `{{token}}`)
- **Endpoints**: conforme exemplos acima

Salve o `accessToken` em uma variável de ambiente após login para reutilizar em requests posteriores.