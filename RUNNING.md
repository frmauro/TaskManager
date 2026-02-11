# 🎯 Como Executar o TaskManager Completo

## 📋 Índice
1. [Iniciar Backend](#iniciar-backend)
2. [Iniciar Frontend](#iniciar-frontend)
3. [Acessar Aplicação](#acessar-aplicação)
4. [Verificar Funcionamento](#verificar-funcionamento)

## 🔧 Iniciar Backend

### Terminal 1: Backend
```bash
# Navegue até o diretório do backend
cd backend/TaskManager.Api

# Compile e execute
dotnet run

# Você deve ver:
# info: Microsoft.Hosting.Lifetime[0]
#       Now listening on: http://localhost:5000
```

**Verificar Backend:**
```bash
# Abra outro terminal e teste
curl http://localhost:5000/api/tasks

# Você deve receber um erro 401 (sem token), mas a API respondeu!
```

## 🌐 Iniciar Frontend

### Terminal 2: Frontend
```bash
# Navegue até o diretório do frontend
cd frontend

# Se for a primeira vez, instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm start

# Você deve ver:
# ✔ Building...
# Application bundle complete.
# ✔ Compiled successfully.
```

**Verificar Frontend:**
- Abra seu navegador em: `http://localhost:4200`
- Você deverá ver a página de login

## 🔐 Acessar Aplicação

### Step 1: Login
```
URL: http://localhost:4200
Email: admin@example.com
Senha: Admin@123
```

### Step 2: Dashboard
Após login bem-sucedido, você será redirecionado para o dashboard de tarefas.

### Step 3: Explorar Funcionalidades

**Criar Tarefa:**
1. Preencha o formulário à esquerda
2. Clique "Criar Tarefa"
3. Veja a tarefa aparecer na lista

**Filtrar Tarefas:**
- Clique "Pendentes" para ver tarefas não concluídas
- Clique "Concluídas" para ver tarefas completadas
- Clique "Todas" para ver todas

**Completar Tarefa:**
- Clique na checkbox da tarefa
- Veja o título ficar com strikethrough

**Deletar Tarefa:**
- Clique no botão 🗑️
- Confirme a exclusão

## ✅ Verificar Funcionamento

### Checklist de Funcionamento

```
[ ] Backend está rodando em http://localhost:5000
[ ] Frontend está rodando em http://localhost:4200
[ ] Página de login carrega
[ ] Login com credenciais funciona
[ ] Dashboard carrega
[ ] Tarefas aparecem na lista
[ ] Criar tarefa funciona
[ ] Filtros funcionam
[ ] Completar tarefa funciona
[ ] Deletar tarefa funciona
```

### DevTools (F12)

**Console:**
```javascript
// Não deve haver erros em vermelho
// Se houver, clique para ver detalhes
```

**Network:**
```
Procure por requisições:
✅ GET /api/tasks        (200 OK)
✅ POST /api/auth/login  (200 OK)
✅ POST /api/tasks       (201 Created)
✅ PUT /api/tasks/{id}   (200 OK)
✅ DELETE /api/tasks/{id} (200 OK)
```

**Application → LocalStorage:**
```
auth_token     (JWT token)
refresh_token  (refresh token)
```

## 🚨 Troubleshooting

### Frontend não conecta ao Backend

**Problema:** 
```
ERROR Failed to fetch
```

**Solução:**
```bash
# 1. Verifique se backend está rodando
curl http://localhost:5000/api/tasks

# 2. Se erro de CORS, edite backend
# backend/TaskManager.Api/Program.cs
# Procure por "WithOrigins" e adicione:
.WithOrigins("http://localhost:4200")

# 3. Reinicie backend
```

### Login não funciona

**Problema:**
```
Falha ao fazer login
```

**Solução:**
```
1. Verifique credenciais:
   - Email: admin@example.com
   - Senha: Admin@123

2. Verifique console (F12) para ver erro exato

3. Se "email inválido", verifique banco:
   - Rode migrations: 
   - dotnet ef database update --project TaskManager.Infrastructure
   
4. Se não houver dados, rode seed:
   - O seed roda automaticamente ao iniciar a API
```

### Tarefas não carregam

**Problema:**
```
Spinner ficar preso ou "Nenhuma tarefa encontrada"
```

**Solução:**
```bash
# 1. Verifique Network (F12 → Network)
# Veja se GET /api/tasks retornou 200

# 2. Verifique console para erro

# 3. Tente refresh da página (Ctrl+R)

# 4. Se persistir, reinicie ambos (backend e frontend)
```

### Token expirado

**Problema:**
```
Erro 401 em algumas requisições
```

**Solução:**
```
O sistema tenta renovar automaticamente.
Se não funcionar:
1. F12 → Application → LocalStorage
2. Delete auth_token e refresh_token
3. Refresh da página (Ctrl+R)
4. Faça login novamente
```

## 📊 Verificação de Saúde

### Backend Health

```bash
# Terminal de teste
curl -i http://localhost:5000/api/tasks

# Esperado:
HTTP/1.1 401 Unauthorized
# (401 é OK, significa API respondeu!)
```

### Frontend Health

```bash
# Verifique no navegador
# DevTools → Console → Não deve haver erros
```

### Database Health

```bash
# Conecte ao MySQL
mysql -u root -p

# Dentro do MySQL:
USE ShoppingCartDb;
SELECT COUNT(*) FROM Users;
SELECT COUNT(*) FROM Tasks;
```

## 🔄 Parar Aplicações

### Frontend
```bash
# No terminal do frontend:
Ctrl + C

# Ou através do terminal:
npm stop  # (Se configurado)
```

### Backend
```bash
# No terminal do backend:
Ctrl + C
```

## 📖 Documentações

- **Frontend Completo:** `frontend/README_FRONTEND.md`
- **Estrutura de Projeto:** `frontend/PROJECT_STRUCTURE.md`
- **Quick Start:** `frontend/QUICK_START.md`
- **Guia de Testes:** `frontend/TESTING_GUIDE.md`
- **Backend:** `backend/TaskManager.Api/README.md`

## 🎓 Próximos Passos

Após executar com sucesso:

1. **Explorar o Código:**
   - `frontend/src/app/features/auth/pages/login.component.ts`
   - `frontend/src/app/features/tasks/pages/tasks-dashboard.component.ts`

2. **Entender a Arquitetura:**
   - `frontend/PROJECT_STRUCTURE.md`

3. **Customizar:**
   - Adicionar novas features
   - Mudar cores (Tailwind)
   - Adicionar validações

4. **Testar:**
   - Seguir `TESTING_GUIDE.md`
   - Testar diferentes cenários

5. **Deploy:**
   - Build para produção: `npm run build`
   - Hospedar `dist/frontend/` em servidor web

## 📞 Suporte Rápido

| Problema | Solução |
|----------|---------|
| CORS Error | Configure backend para aceitar localhost:4200 |
| 404 Not Found | Verifique se backend está rodando |
| Token inválido | Faça logout e login novamente |
| Componente não renderiza | Verifique console para erro de TypeScript |
| API lenta | Pode ser normal na primeira requisição |

## ✨ Sucesso!

Se tudo funcionar:

✅ Backend rodando
✅ Frontend rodando
✅ Pode fazer login
✅ Pode criar/editar/deletar tarefas

**Parabéns! 🎉 TaskManager está pronto para uso!**

---

**Última atualização:** Janeiro 27, 2026
**Status:** ✅ Pronto para Produção
