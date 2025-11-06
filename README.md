# Palazzo API

API RESTful para gerenciamento de imóveis de luxo, permitindo criar, listar, atualizar e deletar propriedades com upload de imagens para AWS S3, sistema de favoritos e autenticação JWT.

---

## 🔗 Link para testar no Postman

Você pode testar todos os endpoints diretamente no Postman através do workspace público:

[Palazzo API no Postman](https://www.postman.com/martian-shuttle-256743/workspace/palazzo)

---

## 🛠 Tecnologias

* **Node.js** - Runtime JavaScript
* **Express** - Framework web
* **Sequelize** - ORM para PostgreSQL
* **PostgreSQL** - Banco de dados relacional
* **AWS S3** - Armazenamento de imagens
* **Multer** - Upload de arquivos
* **Multer-S3** - Upload direto para S3
* **Zod** - Validação de schemas
* **JWT (jsonwebtoken)** - Autenticação
* **Bcryptjs** - Hash de senhas
* **Dotenv** - Variáveis de ambiente
* **ESLint + Prettier** - Qualidade de código

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

3. Crie um arquivo `.env` com as variáveis necessárias segundo o `.env.example`:

```env
# Server
SERVER_PORT=3000

# Database
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=palazzo
DB_HOST=localhost
DB_PORT=5432

# JWT
ACCESS_TOKEN_SECRET=seu_secret_access
REFRESH_TOKEN_SECRET=seu_secret_refresh

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=sua_access_key
AWS_SECRET_ACCESS_KEY=sua_secret_key
AWS_BUCKET_NAME=seu_bucket
```

4. Configure o banco de dados PostgreSQL:

```bash
# Criar banco de dados
createdb palazzo

# Rodar migrations
npm run db:migrate

# (Opcional) Rodar seeds para dados de exemplo
npm run db:seed
```

5. Rode a API:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

---

## ⚡ Endpoints

### Auth (Autenticação)

* `POST /api/login` → Login do usuário
* `POST /api/register` → Criar usuário
* `POST /api/refresh` → Atualizar token
* `GET /api/me` 🔒 → Informações do usuário autenticado

### Listings (Imóveis)

* `GET /api/listings` → Listar imóveis com filtros e paginação
* `GET /api/listings/:id` → Buscar imóvel por ID
* `POST /api/listings` 🔒 → Criar novo imóvel (suporta upload de múltiplas imagens)
* `PATCH /api/listings/:id` 🔒 → Atualizar imóvel (suporta adicionar/remover imagens)
* `DELETE /api/listings/:id` 🔒 → Deletar imóvel (remove imagens do S3)

### Favorites (Favoritos)

* `GET /api/favorites` 🔒 → Listar favoritos do usuário
* `POST /api/favorites` 🔒 → Adicionar imóvel aos favoritos
* `DELETE /api/favorites` 🔒 → Remover imóvel dos favoritos

### Users (Usuários)

* `GET /api/users` 🔒 → Listar todos os usuários
* `GET /api/users/:id` 🔒 → Buscar usuário por ID
* `PATCH /api/users/:id` 🔒 → Atualizar usuário
* `DELETE /api/users/:id` 🔒 → Deletar usuário

> **Observação:** Endpoints com 🔒 são protegidos por token JWT.

---

## � Filtros e Paginação (GET /api/listings)

A API suporta diversos filtros e paginação para listar imóveis:

### Paginação
* `page` - Número da página (padrão: 1)
* `limit` - Itens por página (padrão: 6)

### Filtros
* `type` - Tipo do imóvel (`house`, `apartment`, `penthouse`, `loft`)
* `search` - Busca textual (título, descrição, cidade, bairro, região, país)
* `country` - Filtro por país
* `city` - Filtro por cidade
* `minBedrooms` - Número mínimo de quartos
* `minBathrooms` - Número mínimo de banheiros
* `minSquareMeters` - Metragem mínima (m²)
* `minPrice` - Preço mínimo
* `maxPrice` - Preço máximo

### Exemplos:

```bash
# Listar primeira página (6 itens)
GET /api/listings

# Segunda página com 10 itens
GET /api/listings?page=2&limit=10

# Casas com 3+ quartos no Brasil
GET /api/listings?type=house&country=Brasil&minBedrooms=3

# Apartamentos no Rio entre R$ 500k e R$ 2M
GET /api/listings?type=apartment&city=Rio de Janeiro&minPrice=500000&maxPrice=2000000

# Busca por "piscina" com 2+ banheiros
GET /api/listings?search=piscina&minBathrooms=2&page=1
```

### Resposta:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Casa de Luxo",
      "type": "house",
      "price": 1500000,
      "bedrooms": 4,
      "bathrooms": 3,
      "squareMeters": 250,
      "city": "Rio de Janeiro",
      "country": "Brasil",
      "images": ["https://bucket.s3.amazonaws.com/..."],
      ...
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 28,
    "itemsPerPage": 6
  }
}
```

Para mais detalhes sobre filtros, veja [FILTERS.md](FILTERS.md).

---

## 📁 Estrutura do Projeto (Clean Architecture)

```
src/
├─ application/
│  └─ services/          # Casos de uso e lógica de negócio
│     ├─ AuthService.js
│     ├─ FavoritesService.js
│     ├─ ListingsService.js
│     ├─ UsersService.js
│     └─ s3Service.js
├─ domain/
│  ├─ models/            # Modelos Sequelize
│  │  ├─ Favorite.js
│  │  ├─ Listing.js
│  │  └─ User.js
│  ├─ repositories/      # Acesso a dados
│  │  ├─ FavoritesRepository.js
│  │  ├─ ListingsRepository.js
│  │  └─ UsersRepository.js
│  └─ validators/        # Validações com Zod
│     ├─ favoriteValidator.js
│     ├─ listingValidator.js
│     └─ userValidator.js
├─ http/
│  ├─ controllers/       # Controllers REST
│  │  ├─ AuthController.js
│  │  ├─ FavoritesController.js
│  │  ├─ ListingsController.js
│  │  └─ UsersController.js
│  ├─ dtos/             # Data Transfer Objects
│  ├─ middlewares/      # Middlewares
│  │  ├─ authMiddleware.js
│  │  ├─ errorHandler.js
│  │  └─ upload.js
│  └─ routes/           # Definição de rotas
├─ infra/
│  └─ db/
│     ├─ index.js       # Configuração Sequelize
│     ├─ migrations/    # Migrations do banco
│     └─ seeders/       # Seeds para dados de teste
├─ shared/
│  ├─ config/           # Configurações
│  ├─ errors/           # Classes de erro customizadas
│  └─ utils/            # Utilitários (JWT, hash)
├─ app.js               # Configuração do Express
└─ server.js            # Inicialização do servidor
```

---

## 🗄️ Banco de Dados

### Modelos:

**Users**
- id, name, email, hashedPassword, phone, role, timestamps

**Listings**
- id, title, type, price, description, city, neighborhood, region, country
- bedrooms, bathrooms, squareMeters, images (array), contactPhone, contactEmail, timestamps

**Favorites** (Tabela de junção)
- userId, listingId, timestamps

### Scripts úteis:

```bash
# Reset completo (drop + migrate + seed)
npm run db:reset

# Apenas migrations
npm run db:migrate

# Desfazer última migration
npm run db:migrate:undo

# Rodar seeds
npm run db:seed

# Desfazer seeds
npm run db:seed:undo
```

---

## 📤 Upload de Imagens

As imagens são enviadas diretamente para o **AWS S3**:

- Suporta múltiplas imagens por imóvel
- Ao deletar um imóvel, todas as imagens são removidas do S3
- URLs pré-assinadas com expiração de 1 hora para segurança
- Formato aceito: JPG, PNG
- Tamanho máximo configurável

### Exemplo de upload (form-data):
```
title: Casa de Luxo
type: house
price: 1500000
images: [arquivo1.jpg, arquivo2.jpg]
...demais campos
```

---

## 🔒 Autenticação

Endpoints protegidos requerem **JWT Token** no header:

```
Authorization: Bearer <SEU_TOKEN>
```

### Tokens:
- **Access Token**: Expira em 1 hora
- **Refresh Token**: Expira em 30 dias

Use o endpoint `/api/refresh` para renovar o access token.

---

## 🧪 Testes com Postman

- O workspace público no Postman permite testar todos os endpoints
- Para upload de imagens, use o tipo **form-data**
- Endpoints protegidos já estão configurados com Bearer Token

---

## 📝 Scripts NPM

```bash
npm run dev          # Inicia servidor em modo desenvolvimento
npm run db:migrate   # Roda migrations
npm run db:seed      # Roda seeds
npm run db:reset     # Reset completo do banco
```

---


