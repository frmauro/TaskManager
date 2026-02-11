# 📑 Índice de Documentação - TaskManager Frontend

## 🚀 Início Rápido

**Novo no projeto?** Comece aqui:

1. **[RUNNING.md](../RUNNING.md)** - Como executar backend + frontend
2. **[QUICK_START.md](./QUICK_START.md)** - Guia rápido para desenvolvedores

## 📚 Documentação Completa

### Para Desenvolvedores
- **[README_FRONTEND.md](./README_FRONTEND.md)** - Documentação técnica completa
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Explicação da arquitetura
- **[FILES_CREATED.md](./FILES_CREATED.md)** - Lista de todos os arquivos criados

### Para Testers/QA
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Guia de testes completo
- **[RUNNING.md](../RUNNING.md)** - Como executar e verificar

### Para Gestores/Stakeholders
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Resumo da implementação

## 🗂️ Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/           ← Serviços centralizados
│   │   ├── features/       ← Módulos (Auth, Tasks)
│   │   └── shared/         ← Componentes e Modelos
│   ├── environments/       ← Configuração por ambiente
│   └── styles.css         ← Estilos globais (Tailwind)
├── angular.json            ← Config do Angular CLI
├── package.json            ← Dependências npm
└── [documentação]          ← Arquivos .md
```

## 🔍 Navegação por Tópico

### Autenticação
- **LoginComponent:** `src/app/features/auth/pages/login.component.ts`
- **AuthService:** `src/app/features/auth/services/auth.service.ts`
- **JwtInterceptor:** `src/app/core/interceptors/jwt.interceptor.ts`
- **AuthGuard:** `src/app/core/guards/auth.guard.ts`

### Tarefas
- **TasksDashboardComponent:** `src/app/features/tasks/pages/tasks-dashboard.component.ts`
- **TaskService:** `src/app/features/tasks/services/task.service.ts`
- **Task Models:** `src/app/shared/models/task.model.ts`

### Componentes Reutilizáveis
- **ButtonComponent:** `src/app/shared/components/button.component.ts`
- **InputComponent:** `src/app/shared/components/input.component.ts`
- **AlertComponent:** `src/app/shared/components/alert.component.ts`
- **LoadingComponent:** `src/app/shared/components/loading.component.ts`
- **HeaderComponent:** `src/app/shared/components/header.component.ts`

### Configuração
- **Rotas:** `src/app/app.routes.ts`
- **Providers:** `src/app/app.config.ts`
- **Environment Dev:** `src/environments/environment.ts`
- **Environment Prod:** `src/environments/environment.prod.ts`

## 💡 Guias por Tarefa

### "Quero executar a aplicação"
→ [RUNNING.md](../RUNNING.md)

### "Quero entender a arquitetura"
→ [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

### "Quero adicionar uma nova feature"
→ [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) (Próximos Passos)

### "Quero testar a aplicação"
→ [TESTING_GUIDE.md](./TESTING_GUIDE.md)

### "Quero fazer deploy"
→ [README_FRONTEND.md](./README_FRONTEND.md) (seção Build para Produção)

### "Quero ver o que foi criado"
→ [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

### "Quero listar todos os arquivos"
→ [FILES_CREATED.md](./FILES_CREATED.md)

## 🔧 Comandos Frequentes

```bash
# Desenvolvimento
npm start                    # Inicia servidor
ng serve                    # Alternativa

# Build
npm run build               # Build padrão
ng build --configuration production  # Com otimizações

# Testes
npm test                    # Testes unitários
npm run test:coverage       # Com cobertura

# Linting
ng lint                     # Verifica código
```

## 📊 Estatísticas do Projeto

- **Componentes:** 7 (5 reutilizáveis + 2 pages)
- **Serviços:** 4 (AuthService, TaskService, ApiService + mais)
- **Interceptors:** 2 (JWT + Error)
- **Guards:** 1 (Auth)
- **Modelos:** 3 (Task, Auth, API)
- **Linhas de Código:** ~1,300+
- **Bundle Size:** ~86kB (gzipped)

## 🎯 Checklist de Onboarding

- [ ] Ler [RUNNING.md](../RUNNING.md)
- [ ] Executar aplicação localmente
- [ ] Fazer login com credenciais de teste
- [ ] Criar/editar/deletar tarefas
- [ ] Ler [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- [ ] Explorar código em `src/app/`
- [ ] Executar testes de [TESTING_GUIDE.md](./TESTING_GUIDE.md)

## 📞 Suporte Rápido

| Pergunta | Resposta |
|----------|----------|
| Como faço login? | Email: `admin@example.com` / Senha: `Admin@123` |
| Qual é a URL? | http://localhost:4200 |
| Backend está onde? | http://localhost:5000 |
| Como faço build? | `npm run build` |
| Onde está a documentação? | Você está aqui! 📍 |

## 🌐 Links Úteis

- [Angular Docs](https://angular.io)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [RxJS](https://rxjs.dev/)

## 📝 Notas

- Projeto usa **Angular 19+ com Standalone Components**
- Estilização com **Tailwind CSS (via CDN)**
- Estado gerenciado com **RxJS Observables**
- Autenticação com **JWT Tokens**
- Interceptors para tratamento centralizado

## 🚀 Status

✅ Projeto completo e funcional
✅ Build compila sem erros
✅ Documentação completa
✅ Pronto para produção

---

**Última atualização:** Janeiro 27, 2026

**Para começar:** Leia [RUNNING.md](../RUNNING.md) →
