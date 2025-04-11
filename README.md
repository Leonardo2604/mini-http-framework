# 🚀 Mini HTTP Framework

Um microframework HTTP criado com Node.js e TypeScript que implementa conceitos fundamentais de frameworks web modernos como Express e Fastify. O projeto foi desenvolvido com foco em arquitetura limpa, desacoplamento e extensibilidade.

## 📌 Funcionalidades

- 📡 Servidor HTTP nativo do Node.js com abstração para outros adaptadores
- 🔀 Sistema de roteamento dinâmico (`GET`, `POST`, `PUT`, `DELETE`)
- 🛠️ Pipeline de middlewares com suporte a middlewares globais e por rota
- 🎯 Injeção de dependências e inversão de controle
- 🔒 Sistema de autenticação modular
- 📦 Parsing automático de JSON nas requisições
- ⚡ Respostas encadeadas com builder pattern
- 🚨 Tratamento centralizado de erros

## 🏗️ Arquitetura

```
src/
├── app.ts              # Ponto de entrada da aplicação
├── config/             # Configurações do sistema
├── infra/              # Implementações de infraestrutura
│   ├── http/          # Adaptador HTTP para Node.js
│   └── database/      # Implementações de banco de dados
├── lib/               # Core do framework
│   ├── http/         # Abstrações HTTP (server, request, response)
│   └── shared/       # Utilitários compartilhados
└── modules/          # Módulos da aplicação
    ├── app/          # Módulo principal
    ├── auth/         # Módulo de autenticação
    └── shared/       # Recursos compartilhados entre módulos
```

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Leonardo2604/mini-http-framework.git
cd mini-http-framework
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor:
```bash
npm run dev
```

## 🚀 Uso

### Criando um Servidor

```typescript
import { server } from '@/infra/http/node';

(async () => {
  await server.start();
  console.log(`Server running on http://${server.host}:${server.port}`);
})();
```

### Definindo Rotas

```typescript
import { Router } from '@/lib/http/router';

const router = new Router();

router.get('/users', async (req, res) => {
  res.json({ users: [] }).send();
});

router.post('/users', async (req, res) => {
  const user = req.body;
  res.status(201).json(user).send();
});
```

### Usando Middlewares

```typescript
import { Middleware } from '@/lib/http/middleware';

const loggerMiddleware: Middleware = async (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  await next();
};

server.use(loggerMiddleware);
```

## 🧪 Testes

O projeto utiliza Jest para testes unitários e de integração:

```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage
```

## 📚 Princípios de Design

- **Desacoplamento**: Uso de abstrações para reduzir dependências diretas
- **Inversão de Controle**: Implementações concretas são plugins do sistema
- **Single Responsibility**: Cada módulo tem uma responsabilidade única
- **Interface Segregation**: Interfaces pequenas e específicas
- **Dependency Inversion**: Dependência de abstrações, não implementações

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

