# TaskManager - Frontend (Angular 19+)

SPA (Single Page Application) para gerenciamento de tarefas desenvolvido com Angular 19+, utilizando Tailwind CSS para estilização e comunicação via HTTP com uma API REST.

## 📋 Características

- ✅ Autenticação com JWT (JSON Web Tokens)
- ✅ Criar, editar, excluir e listar tarefas
- ✅ Marcar tarefas como concluídas
- ✅ Definir prioridade (baixa, média, alta) e data de vencimento
- ✅ Filtrar tarefas por status e prioridade
- ✅ Interface responsiva com Tailwind CSS
- ✅ Tratamento de erros com interceptors
- ✅ Refresh automático de tokens JWT
- ✅ Código limpo com arquitetura bem definida

## 🏗️ Arquitetura

```
src/app/
├── core/                          # Camada de core (singletons)
│   ├── guards/                    # Guards de rota
│   │   ├── auth.guard.ts         # Proteção de rotas autenticadas
│   │   └── index.ts
│   ├── interceptors/              # Interceptors HTTP
│   │   ├── jwt.interceptor.ts    # Adiciona token JWT às requisições
│   │   ├── error.interceptor.ts  # Tratamento global de erros
│   │   └── index.ts
│   └── services/
│       └── api.service.ts        # Serviço base para chamadas HTTP
├── features/                      # Módulos de features
│   ├── auth/
│   │   ├── pages/
│   │   │   └── login.component.ts
│   │   └── services/
│   │       └── auth.service.ts
│   └── tasks/
│       ├── pages/
│       │   └── tasks-dashboard.component.ts
│       ├── components/
│       └── services/
│           └── task.service.ts
├── shared/                        # Recursos compartilhados
│   ├── components/                # Componentes reutilizáveis
│   │   ├── header.component.ts
│   │   ├── loading.component.ts
│   │   ├── button.component.ts
│   │   ├── input.component.ts
│   │   ├── alert.component.ts
│   │   └── index.ts
│   ├── models/                    # Interfaces e DTOs
│   │   ├── task.model.ts
│   │   ├── auth.model.ts
│   │   ├── api.model.ts
│   │   └── index.ts
│   └── utils/                     # Utilitários e helpers
├── app.routes.ts                  # Definição de rotas
├── app.config.ts                  # Configuração da aplicação
└── app.ts                         # Componente raiz
```

## 🛠️ Tecnologias

- **Angular 19+** - Framework web moderno
- **TypeScript** - Linguagem de programação tipada
- **Tailwind CSS** - Framework CSS utility-first
- **RxJS** - Programação reativa
- **Angular Forms** - Formulários reativos
- **HttpClient** - Comunicação HTTP

## 📦 Dependências

As dependências principais já estão instaladas. Para verificar:

```bash
npm list
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn como gerenciador de pacotes
- Backend (TaskManager API) rodando em `http://localhost:5000/api`

### Instalação

1. Acesse o diretório do projeto frontend:

```bash
cd frontend
```

2. Instale as dependências (se não estiverem instaladas):

```bash
npm install
```

3. Configure as variáveis de ambiente (se necessário):

Edite `src/environments/environment.ts` com a URL correta da sua API:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',  // Ajuste conforme necessário
};
```

### Desenvolvimento

Para executar o servidor de desenvolvimento:

```bash
npm start
```

ou

```bash
ng serve
```

A aplicação estará disponível em `http://localhost:4200`

### Build para Produção

Para gerar a build de produção:

```bash
npm run build
```

ou

```bash
ng build --configuration production
```

Os arquivos compilados estarão em `dist/`

## 🔐 Autenticação

### Credenciais de Teste

- **Email:** `admin@example.com`
- **Senha:** `Admin@123`

### Fluxo de Autenticação

1. Usuário acessa `/login`
2. Fornece credenciais (email e senha)
3. API retorna `token` e `refreshToken`
4. Tokens são armazenados no `localStorage`
5. JwtInterceptor adiciona o token a todas as requisições
6. Se token expirar, ErrorInterceptor tenta renovar automaticamente

## 📝 Endpoints da API

### Autenticação

- `POST /api/auth/login` - Realiza login
- `POST /api/auth/refresh` - Atualiza o token JWT

### Tarefas

- `GET /api/tasks` - Lista todas as tarefas
- `GET /api/tasks/{id}` - Obtém uma tarefa específica
- `POST /api/tasks` - Cria uma nova tarefa
- `PUT /api/tasks/{id}` - Atualiza uma tarefa
- `DELETE /api/tasks/{id}` - Deleta uma tarefa

## 🎯 Fluxo da Aplicação

```
[Usuário]
    ↓
[Login Page] → Autentica com API
    ↓
[Auth Service] → Armazena tokens no localStorage
    ↓
[Tasks Dashboard] → Exibe tarefas do usuário
    ↓
[Task Service] → Realiza operações CRUD com a API
```

## 🔄 Interceptors

### JWT Interceptor
- Adiciona o token JWT ao header `Authorization` de todas as requisições
- Verifica expiração do token
- Tenta renovar o token automaticamente em caso de erro 401

### Error Interceptor
- Captura e trata erros HTTP globalmente
- Loga erros no console para debugging
- Padroniza o tratamento de erros

## 🛡️ Guards

### Auth Guard
- Protege rotas que requerem autenticação
- Redireciona para `/login` se o usuário não estiver autenticado
- Passa a URL de retorno como parâmetro de query

## 📱 Componentes Compartilhados

- **HeaderComponent** - Cabeçalho da aplicação
- **LoadingComponent** - Spinner de carregamento
- **ButtonComponent** - Botão reutilizável com variantes
- **InputComponent** - Campo de input reutilizável
- **AlertComponent** - Componente de alerta/mensagem

## 🧹 Linting e Formatação

Para verificar o código:

```bash
ng lint
```

## 🧪 Testes

Para executar os testes:

```bash
ng test
```

Para cobertura de testes:

```bash
ng test --code-coverage
```

## 📚 Documentação Adicional

- [Angular Documentation](https://angular.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [RxJS Documentation](https://rxjs.dev/)

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## 👥 Autor

Desenvolvido como parte do projeto TaskManager - Sistema de Gerenciamento de Tarefas.

## 📞 Suporte

Para suporte, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.

---

**Última atualização:** Janeiro 2026
