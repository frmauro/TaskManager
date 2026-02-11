# 🧪 Guia de Teste - TaskManager (Frontend + Backend)

## Pré-requisitos

- ✅ Backend rodando em `http://localhost:5000/api`
- ✅ Frontend rodando em `http://localhost:4200`
- ✅ Banco de dados MySQL populado com seed data

## Cenários de Teste

### 1. Login
**Steps:**
1. Navegue para `http://localhost:4200`
2. Você será redirecionado para `/login`
3. Insira as credenciais:
   - Email: `admin@example.com`
   - Senha: `Admin@123`
4. Clique em "Entrar"

**Expected Results:**
- ✅ Mensagem de sucesso "Login realizado com sucesso!"
- ✅ Redirecionamento para `/tasks` após 1 segundo
- ✅ Token armazenado em `localStorage`

**Troubleshooting:**
```
Erro: "Falha ao fazer login"
→ Verifique se o backend está rodando
→ Verifique se as credenciais estão corretas
→ Verifique o console (F12) para mais detalhes
```

### 2. Listar Tarefas
**Expected Results:**
- ✅ Dashboard carrega com lista de tarefas
- ✅ Spinner aparece durante carregamento
- ✅ Se nenhuma tarefa existe: "Nenhuma tarefa encontrada"

**Teste:**
- Abra DevTools (F12) → Network
- Verifique se a requisição `GET /api/tasks` foi bem-sucedida (status 200)

### 3. Criar Tarefa
**Steps:**
1. Preencha o formulário "Nova Tarefa":
   - Título: "Minha primeira tarefa"
   - Descrição: "Descrição da tarefa"
   - Prioridade: Média
   - Data: (deixar em branco ou preencher)
2. Clique "Criar Tarefa"

**Expected Results:**
- ✅ Mensagem "Tarefa criada com sucesso!"
- ✅ Nova tarefa aparece na lista
- ✅ Formulário é resetado
- ✅ Requisição POST para `/api/tasks` é enviada

**Teste:**
```bash
# Verify em DevTools → Network
POST /api/tasks
Status: 201 Created
```

### 4. Filtrar Tarefas
**Test Cases:**

**a) Pendentes**
- Clique no botão "Pendentes"
- Expected: Mostrar apenas tarefas não concluídas

**b) Concluídas**
- Clique no botão "Concluídas"
- Expected: Mostrar apenas tarefas concluídas

**c) Todas**
- Clique no botão "Todas"
- Expected: Mostrar todas as tarefas

### 5. Marcar Tarefa como Concluída
**Steps:**
1. Clique na checkbox de uma tarefa
2. Observe o título ficar com strikethrough

**Expected Results:**
- ✅ Checkbox marcada
- ✅ Título com linha atravessando
- ✅ Requisição PUT para `/api/tasks/{id}` enviada
- ✅ Filtro "Concluídas" mostra a tarefa após refresh

### 6. Deletar Tarefa
**Steps:**
1. Clique no botão 🗑️ de uma tarefa
2. Confirme no dialog que aparecerá

**Expected Results:**
- ✅ Dialog de confirmação aparece
- ✅ Mensagem "Tem certeza que deseja deletar esta tarefa?"
- ✅ Se confirmado: "Tarefa deletada com sucesso!"
- ✅ Tarefa é removida da lista
- ✅ Requisição DELETE para `/api/tasks/{id}` enviada

### 7. Responsividade
**Test em Diferentes Tamanhos:**

**Mobile (320px - 480px)**
- Clique no menu (se existir)
- Formulário deve estar em coluna única
- Tarefas visíveis com boa UX

**Tablet (768px - 1024px)**
- Layout em duas colunas deve funcionar
- Elementos não devem sobrepor

**Desktop (1920px+)**
- Layout em três colunas (navegação, form, tasks)
- Confortável para uso

### 8. Tratamento de Erros

**Teste: API Offline**
1. Pare o backend (Ctrl+C em seu terminal)
2. Tente criar/carregar tarefas
3. Expected: Mensagem de erro clara

**Teste: Token Expirado**
1. Aguarde token expirar (ou altere manualmente em DevTools)
2. Tente fazer alguma ação
3. Expected: Refresh automático ou redirecionamento para login

### 9. Autenticação

**Test: Acesso Sem Token**
1. Abra DevTools → Application → LocalStorage
2. Delete `auth_token` e `refresh_token`
3. Recarregue a página
4. Expected: Redirecionamento para `/login`

**Test: Token Inválido**
1. Altere o token em LocalStorage para algo inválido
2. Tente carregar tarefas
3. Expected: Error handler intercepta e trata

### 10. Performance

**Teste Velocidade:**
1. DevTools → Lighthouse
2. Rode auditoria de performance
3. Esperado: Score > 80

**Teste Bundle Size:**
```bash
npm run build
# Verifique tamanho em dist/frontend/
```

Esperado: ~86kB gzipped

## 🔍 Debugging

### Console Errors
```javascript
// DevTools → Console
// Procure por erros em vermelho
// Verifique Network tab para requisições falhadas
```

### Network Inspection
```
F12 → Network → XHR
Verifique:
- Status codes (200, 401, 500, etc)
- Headers (Authorization, Content-Type)
- Response bodies
```

### Local Storage
```javascript
// DevTools → Application → Local Storage
localStorage.getItem('auth_token')  // Deve existir após login
localStorage.getItem('refresh_token')
```

### Logs
```typescript
// Adicione console.log em services para debug
console.log('Token:', this.authService.getToken());
console.log('Tasks:', this.tasks);
```

## 🚀 Teste de Carga

```bash
# Teste com múltiplas tarefas
# Crie ~100 tarefas e verifique performance

# Teste de memória
# Chrome DevTools → Memory → Heap snapshots
```

## ✅ Checklist Final

- [ ] Login funciona com credenciais corretas
- [ ] Erros de login são tratados
- [ ] Tarefas carregam ao entrar no dashboard
- [ ] Criar tarefa funciona
- [ ] Filtros funcionam corretamente
- [ ] Toggle de conclusão funciona
- [ ] Delete funciona com confirmação
- [ ] Responsividade em todos os tamanhos
- [ ] Tratamento de erros funciona
- [ ] Performance é aceitável
- [ ] UI/UX é intuitiva
- [ ] Não há erros no console

## 📊 Testes Automáticos (Opcional)

```bash
# Unit tests
ng test

# E2E tests
ng e2e

# Code coverage
ng test --code-coverage
```

## 📝 Relatório de Testes

Ao completar os testes, documente:
- ✅ Testes que passaram
- ❌ Testes que falharam
- ⚠️ Warnings ou comportamentos inesperados
- 💡 Sugestões de melhorias

## 🐛 Bugs Conhecidos

(Nenhum no momento)

## 📞 Suporte

Se encontrar problemas:
1. Verifique se backend está rodando
2. Verifique console (F12)
3. Verifique Network requests
4. Limpe cache/localStorage
5. Tente em novo navegador

---

**Teste Concluído:** Marque aqui ✅
