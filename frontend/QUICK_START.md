# 🚀 Quick Start - TaskManager Frontend

## Guia Rápido de Execução

### Pré-requisitos
- ✅ Node.js 18+
- ✅ npm
- ✅ Backend rodando em `http://localhost:5000/api`

### 1. Instalação

```bash
cd frontend
npm install
```

### 2. Configuração (Opcional)

Se sua API estiver em uma URL diferente, edite:
```bash
src/environments/environment.ts
```

Altere `apiUrl`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://seu-servidor:porta/api',  // Altere aqui
};
```

### 3. Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

ou

```bash
ng serve
```

A aplicação estará disponível em: **http://localhost:4200**

### 4. Login

Use as credenciais de teste:
- **Email:** `admin@example.com`
- **Senha:** `Admin@123`

### 5. Build para Produção

```bash
npm run build
```

Os arquivos compilados estarão em `dist/frontend/`

## 📋 Estrutura de Pastas

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                 # Serviços e guards centralizados
│   │   ├── features/             # Módulos de features (auth, tasks)
│   │   ├── shared/               # Componentes, modelos e utilitários
│   │   ├── app.routes.ts         # Rotas da aplicação
│   │   ├── app.config.ts         # Configuração do app
│   │   └── app.ts                # Componente raiz
│   ├── environments/             # Configurações de ambiente
│   ├── main.ts                   # Ponto de entrada
│   ├── index.html                # HTML principal
│   └── styles.css                # Estilos globais
├── angular.json                  # Configuração do Angular CLI
├── tsconfig.json                 # Configuração do TypeScript
├── package.json                  # Dependências do projeto
└── README_FRONTEND.md            # Documentação completa
```

## 🔍 Funcionalidades Principais

✅ **Autenticação JWT**
- Login seguro
- Refresh token automático
- Proteção de rotas

✅ **Gerenciamento de Tarefas**
- Criar tarefas
- Editar tarefas
- Deletar tarefas
- Marcar como concluída
- Filtrar por status
- Definir prioridade e data de vencimento

✅ **Interface Moderna**
- Responsiva com Tailwind CSS
- Componentes reutilizáveis
- Feedback visual (loading, erros, sucesso)

## 🛠️ Comandos Disponíveis

```bash
# Desenvolvimento
npm start                    # Inicia servidor de desenvolvimento
ng serve                     # Alternativa usando Angular CLI

# Build
npm run build               # Compila para produção
ng build                    # Alternativa usando Angular CLI
ng build --configuration production  # Build com optimizações

# Testes
npm test                    # Executa testes unitários
npm run test:coverage       # Gera relatório de cobertura

# Linting
ng lint                     # Verifica código com ESLint
```

## 🔗 Endpoints Consumidos

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Atualizar token

### Tarefas
- `GET /api/tasks` - Listar tarefas
- `GET /api/tasks/{id}` - Obter tarefa
- `POST /api/tasks` - Criar tarefa
- `PUT /api/tasks/{id}` - Atualizar tarefa
- `DELETE /api/tasks/{id}` - Deletar tarefa

## 💾 Armazenamento Local

O aplicativo usa `localStorage` para persistir:
- `auth_token` - Token JWT
- `refresh_token` - Token de renovação

## 🌐 Navegação

```
/             → Redireciona para /tasks
/login        → Página de login
/tasks        → Dashboard de tarefas (requer autenticação)
/**           → Redireciona para /tasks (fallback)
```

## 📊 Performance

- **Bundle size:** ~86kB (gzipped)
- **Initial load:** < 2s
- **Change detection:** OnPush ready
- **Tree-shaking:** Componentes standalone

## 🐛 Troubleshooting

### Erro "API não responde"
Verifique se o backend está rodando em `http://localhost:5000`

### Erro "Token inválido"
Faça logout e login novamente

### Erro "CORS"
Configure CORS no backend para aceitar requisições do frontend

### Erro "Módulo não encontrado"
Execute `npm install` novamente

## 📚 Recursos Adicionais

- [Documentação Completa](./README_FRONTEND.md)
- [Estrutura do Projeto](./PROJECT_STRUCTURE.md)
- [Angular Docs](https://angular.io)
- [Tailwind CSS Docs](https://tailwindcss.com)

## 🎯 Próximos Passos

1. ✅ Executar aplicação localmente
2. ✅ Fazer login com credenciais de teste
3. ✅ Criar primeira tarefa
4. ✅ Explorar funcionalidades
5. ✅ Customizar conforme necessário

---

**Desenvolvido com ❤️ usando Angular 19+ e Tailwind CSS**
