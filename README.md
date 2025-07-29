# Agenda de Contatos - Frontend Vue.js

Este projeto é um sistema de gerenciamento de contatos implementado como uma aplicação Vue.js com TypeScript. O objetivo é demonstrar conhecimentos em desenvolvimento frontend, arquitetura de software e boas práticas de programação.

## 📋 Sobre o Projeto

Este é o **frontend** da aplicação Agenda de Contatos. O **backend** está disponível em um repositório separado:

- **🔗 Backend Repository**: [https://github.com/SalowQ/AgendaContatos](https://github.com/SalowQ/AgendaContatos)
- **🌐 Frontend Online**: [https://agenda-contatos-front.vercel.app/](https://agenda-contatos-front.vercel.app/)

> **⚠️ Importante**: Para que o frontend funcione corretamente, o backend e banco de dados precisam estar rodando localmente.

## 🌐 URLs

### Produção

- **Aplicação Online**: [https://agenda-contatos-front.vercel.app/](https://agenda-contatos-front.vercel.app/)

### Desenvolvimento

- **Aplicação Principal**: `http://localhost:5173`
- **Preview**: `http://localhost:4173`
- **API Backend**: `https://localhost:7289/`

## 🚀 Tecnologias Utilizadas

### Core

- **Vue 3** - Framework principal para desenvolvimento
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Vue Router** - Roteamento SPA

### UI/UX

- **Tailwind CSS 4** - Framework de estilização
- **Vue3 Spinners** - Componentes de loading
- **SweetAlert2** - Notificações e modais

### Desenvolvimento

- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Vitest** - Testes unitários
- **Cypress** - Testes E2E
- **Axios** - Cliente HTTP

## 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** (versão 9 ou superior)

## 🔧 Instalação

### Frontend

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITÓRIO]
cd AgendaContatosFront
```

2. Instale as dependências:

```bash
npm install
```

### Backend

Para que a aplicação funcione completamente, você também precisa do backend:

1. Clone o repositório do backend:

```bash
git clone https://github.com/SalowQ/AgendaContatos
cd AgendaContatos
```

2. Siga as instruções de instalação e configuração do backend no repositório correspondente.

3. Certifique-se de que o backend esteja rodando em `https://localhost:7289/`

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

Para rodar o projeto em modo de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Configuração da API

O frontend está configurado para se comunicar com a API local. A URL da API está definida em `src/api/httpClient.js`:

```javascript
baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7289/api'
```

**Para usar a aplicação completa:**

1. **Inicie o backend** (seguindo as instruções do repositório backend)
2. **Inicie o frontend**: `npm run dev`
3. **Acesse**: `http://localhost:5173` ou `https://agenda-contatos-front.vercel.app/`

> **💡 Dica**: Se o backend estiver rodando em uma porta diferente, você pode configurar a variável de ambiente `VITE_API_URL` no arquivo `.env.local`

### Build

Para criar uma build de produção:

```bash
npm run build
```

### Preview

Para visualizar a build de produção:

```bash
npm run preview
```

## 🧪 Testes

### Executando os Testes Unitários

```bash
npm run test:unit
```

### Executando os Testes E2E (Cypress)

1. Inicie a aplicação:

```bash
npm run dev
```

2. Em outro terminal, rode o Cypress:

```bash
# Para abrir a interface do Cypress
npm run test:e2e:dev

# Para rodar os testes E2E em modo headless
npm run test:e2e
```

Os testes E2E estão localizados em `cypress/e2e/`.

## 📁 Estrutura do Projeto

```
AgendaContatosFront/
├── src/
│   ├── api/                    # Serviços de API
│   │   ├── auth.js            # Autenticação
│   │   ├── contatos.js        # CRUD de contatos
│   │   ├── contatos.d.ts      # Tipos TypeScript
│   │   └── httpClient.js      # Cliente HTTP configurado
│   ├── assets/                 # Recursos estáticos
│   │   ├── base.css           # Estilos base
│   │   ├── logo.svg           # Logo da aplicação
│   │   └── main.css           # Estilos principais
│   ├── components/             # Componentes Vue
│   │   ├── AppHeader.vue      # Cabeçalho da aplicação
│   │   ├── ContactForm.vue    # Formulário de contatos
│   │   └── LoadingSpinner.vue # Componente de loading
│   ├── composables/            # Composables Vue
│   │   ├── useAuth.ts         # Gerenciamento de autenticação
│   │   ├── useContacts.ts     # Gerenciamento de contatos
│   │   ├── useLoading.ts      # Gerenciamento de loading
│   │   └── useModal.ts        # Gerenciamento de modais
│   ├── router/                 # Configuração de rotas
│   │   └── index.ts           # Definição das rotas
│   ├── views/                  # Páginas da aplicação
│   │   ├── HomeView.vue       # Página principal
│   │   ├── LoginView.vue      # Página de login
│   │   ├── RegisterView.vue   # Página de cadastro
│   │   └── NotFoundView.vue   # Página 404
│   ├── App.vue                # Componente raiz
│   └── main.ts                # Ponto de entrada
├── cypress/                    # Testes E2E
│   ├── e2e/                   # Testes end-to-end
│   ├── fixtures/              # Dados de teste
│   └── support/               # Configuração do Cypress
├── public/                     # Arquivos públicos
└── package.json               # Dependências e scripts
```

## 🔄 Fluxo de Desenvolvimento

### Arquitetura do Sistema

O projeto está dividido em duas partes:

- **Frontend** (este repositório): Interface Vue.js hospedada no Vercel
- **Backend** ([AgendaContatos](https://github.com/SalowQ/AgendaContatos)): API e banco de dados rodando localmente

### Desenvolvimento Local

1. **Autenticação**: Sistema de login simples com localStorage
2. **Proteção de Rotas**: Middleware de autenticação no router
3. **Gerenciamento de Estado**: Composables Vue para estado global
4. **API Integration**: Serviços para comunicação com backend local

### Funcionalidades

- **Navegação SPA**: Todas as navegações usam Vue Router (sem recarregar página)
- **Logout**: Remove dados do localStorage e navega para `/login`
- **Responsividade**: Interface adaptável para diferentes dispositivos
- **Formulários**: Validação e gerenciamento de estado
- **Loading States**: Feedback visual durante operações
- **Error Handling**: Tratamento de erros com modais informativos

## 📝 Scripts Disponíveis

### Scripts de Desenvolvimento

- `npm run dev` - Executa o servidor de desenvolvimento (Vite)
- `npm run preview` - Preview da build de produção

### Scripts de Build

- `npm run build` - Build de produção
- `npm run build-only` - Build sem type-check

### Scripts de Qualidade

- `npm run lint` - Lint do código
- `npm run format` - Formatação com Prettier
- `npm run type-check` - Verificação de tipos TypeScript

### Scripts de Teste

- `npm run test:unit` - Testes unitários (Vitest)
- `npm run test:e2e` - Testes E2E (Cypress)
- `npm run test:e2e:dev` - Testes E2E em modo desenvolvimento

## 🎨 Funcionalidades da Interface

### Design System

- **Gradientes**: Background com gradiente azul para roxo
- **Componentes**: Header, formulários, spinners
- **Modais**: Notificações com SweetAlert2
- **Loading**: Spinners durante operações assíncronas

### Navegação

- **Home** (`/`) - Lista de contatos (requer autenticação)
- **Login** (`/login`) - Página de login
- **Cadastro** (`/cadastro`) - Página de registro (requer autenticação)
- **404** - Página para rotas não encontradas

### Autenticação

- **Login Simples**: Baseado em localStorage
- **Proteção de Rotas**: Middleware no router
- **Logout**: Limpeza de dados e redirecionamento

## 🚀 Deploy

### Deploy no Vercel

Este projeto está configurado para deploy automático no Vercel. A aplicação está disponível em:

**🌐 URL de Produção**: [https://agenda-contatos-front.vercel.app/](https://agenda-contatos-front.vercel.app/)

### Configuração do Deploy

O projeto inclui um arquivo `vercel.json` com a configuração mínima necessária para deploy de SPAs Vue.js:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Como Fazer Deploy

1. **Conecte seu repositório ao Vercel**:

   - Acesse [vercel.com](https://vercel.com)
   - Importe seu repositório GitHub
   - O Vercel detectará automaticamente que é um projeto Vue.js

2. **Deploy Automático**:

   - A cada push para a branch `main`, o Vercel fará deploy automático
   - O build usa o comando `npm run build` definido no `package.json`

3. **Deploy Manual** (se necessário):
   ```bash
   npm install -g vercel
   vercel
   ```

### Build de Produção

```bash
npm run build
```

### Servidor de Preview

```bash
npm run preview
```

### Estrutura de Deploy

- **Dist**: Arquivos otimizados para produção
- **Assets**: Recursos estáticos compilados
- **SPA**: Configuração para Single Page Application

## 📚 Documentação Adicional

### Composables

- **useAuth**: Gerenciamento de autenticação
- **useContacts**: CRUD de contatos
- **useLoading**: Estados de loading
- **useModal**: Notificações e modais

### API Services

- **httpClient**: Cliente HTTP configurado
- **contatos.js**: Serviços de CRUD
- **auth.js**: Serviços de autenticação

### Componentes

- **AppHeader**: Cabeçalho com navegação
- **ContactForm**: Formulário de contatos
- **LoadingSpinner**: Componente de loading

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de Porta**: Verifique se a porta 5173 está disponível
2. **Dependências**: Execute `npm install` novamente
3. **TypeScript**: Execute `npm run type-check` para verificar tipos
4. **Lint**: Execute `npm run lint` para corrigir problemas de código

### Problemas de Conexão com API

1. **Backend não está rodando**: Certifique-se de que o backend esteja rodando em `https://localhost:7289/`
2. **Erro de CORS**: Verifique se o backend está configurado para aceitar requisições do frontend
3. **Certificado SSL**: O backend usa HTTPS, certifique-se de aceitar certificados auto-assinados no navegador
4. **Porta diferente**: Se o backend estiver em outra porta, configure `VITE_API_URL` no `.env.local`

### Verificação de Conectividade

Para testar se a API está funcionando:

```bash
curl -k https://localhost:7289/api/health
```

> **⚠️ Nota**: O `-k` é necessário para aceitar certificados auto-assinados em desenvolvimento

### Logs de Desenvolvimento

- **Console**: Logs detalhados no console do navegador
- **Network**: Verifique requisições na aba Network
- **Vue DevTools**: Use as ferramentas de desenvolvimento do Vue

## 📄 Licença

Este projeto é de uso educacional e demonstrativo.
