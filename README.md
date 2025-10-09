# Palazzo API

API para gerenciamento de imóveis de luxo, permitindo criar, listar, atualizar e deletar propriedades, incluindo upload de imagens.

---

## 🔗 Link para testar no Postman

Você pode testar todos os endpoints diretamente no Postman através do workspace público:

[Palazzo API no Postman](https://www.postman.com/martian-shuttle-256743/workspace/palazzo)

---

## 🛠 Tecnologias

* Node.js
* Express
* Multer
* Zod
* Cors
* JWT
* Bcryptjs
* ESLint + Prettier

---

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/AndreiAlbrecht1/backend-palazzo.git
cd backend-palazzo
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com as variáveis necessárias segundo o .env.example.

4. Rode a API:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

---

## ⚡ Endpoints

### Auth (Autenticação)

* `POST /login` → Login do usuário
* `POST /register` → Criar usuário
* `POST /refresh` → Atualizar token
* `GET /me` 🔒 → Informações do usuário

### Listings (Imóveis)

* `GET /listings` → Listar todos os imóveis
* `GET /listings/:id` → Buscar imóvel por ID
* `POST /listings` 🔒 → Criar novo imóvel (suporta upload de imagens)
* `PATCH /listings/:id` 🔒 → Atualizar imóvel (suporta upload de novas imagens)
* `DELETE /listings/:id` 🔒 → Deletar imóvel

### Users (Usuários)

* `GET /users` 🔒 → Listar todos os usuários
* `GET /users/:id` 🔒 → Buscar usuário por ID
* `PATCH /users/:id` 🔒 → Atualizar usuário
* `DELETE /users/:id` 🔒 → Deletar usuário

> **Observação:** Endpoints com 🔒 são protegidos por token JWT.

---

## 📁 Estrutura do Projeto

```
public/               # Imagens e arquivos estáticos
src/
├─ application/
│  └─ services/       # Lógica de negócio
├─ data/              # Banco de dados em JSON
├─ domain/
│  ├─ repositories/   # Acesso ao JSON de dados
│  └─ validators/     # Validações com Zod
├─ http/
│  ├─ controllers/    # Controllers para rotas
│  ├─ dtos/           # DTOs para criação/atualização de dados
│  ├─ middlewares/    # Middlewares (auth, error handler, multer)
│  └─ routes/         # Definição de rotas
├─ shared/
│  ├─ errors/         # Classes de erro
│  └─ utils/          # JWT e hash
├─ app.js             # Configuração do Express
└─ server.js          # Inicialização do servidor
```

---

## 🧰 Testes com Postman

* O workspace público no Postman permite testar todos os endpoints de forma prática.
* Para upload de imagens, use o tipo **form-data**.

---

## 🔒 Autenticação

* Endpoints protegidos requerem **JWT Token** no header:

```
Authorization: Bearer <SEU_TOKEN>
```

---

