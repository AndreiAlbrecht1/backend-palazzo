# Filtros de Listings

## Endpoints Disponíveis

### GET `/api/listings`

Lista todos os listings com suporte a filtros via query parameters.

## Query Parameters

### 1. Filtro por Tipo (`type`)

Filtra os imóveis por tipo específico.

**Tipos disponíveis:**
- `house` - Casa
- `apartment` - Apartamento
- `penthouse` - Cobertura/Penthouse
- `loft` - Loft

**Exemplo:**
```bash
GET /api/listings?type=house
GET /api/listings?type=apartment
GET /api/listings?type=penthouse
```

**cURL:**
```bash
curl "http://localhost:3000/api/listings?type=house"
```

### 2. Filtro por Busca de Texto (`search`)

Busca listings que contenham o texto especificado em:
- Título
- Descrição
- Cidade
- Bairro
- Região
- País

A busca é **case-insensitive** (não diferencia maiúsculas de minúsculas).

**Exemplo:**
```bash
GET /api/listings?search=piscina
GET /api/listings?search=leblon
GET /api/listings?search=vista mar
GET /api/listings?search=Sudeste
GET /api/listings?search=Brasil
```

**cURL:**
```bash
curl "http://localhost:3000/api/listings?search=piscina"
curl "http://localhost:3000/api/listings?search=Sudeste"
```

### 3. Filtro por País (`country`)

Filtra os imóveis por país específico (filtro exato).

**Exemplo:**
```bash
GET /api/listings?country=Brasil
GET /api/listings?country=Portugal
```

**cURL:**
```bash
curl "http://localhost:3000/api/listings?country=Brasil"
```

### 4. Filtro por Cidade (`city`)

Filtra os imóveis por cidade específica (filtro exato).

**Exemplo:**
```bash
GET /api/listings?city=Rio de Janeiro
GET /api/listings?city=São Paulo
```

**cURL:**
```bash
curl "http://localhost:3000/api/listings?city=Rio de Janeiro"
```

### 5. Filtro por Número Mínimo de Quartos (`minBedrooms`)

Filtra os imóveis com pelo menos o número especificado de quartos.

**Exemplo:**
```bash
GET /api/listings?minBedrooms=3
GET /api/listings?minBedrooms=4
```

**cURL:**
```bash
curl "http://localhost:3000/api/listings?minBedrooms=3"
```

### 6. Filtro por Número Mínimo de Banheiros (`minBathrooms`)

Filtra os imóveis com pelo menos o número especificado de banheiros.

**Exemplo:**
```bash
GET /api/listings?minBathrooms=2
GET /api/listings?minBathrooms=3
```

**cURL:**
```bash
curl "http://localhost:3000/api/listings?minBathrooms=2"
```

### 7. Filtro por Metros Quadrados Mínimos (`minSquareMeters`)

Filtra os imóveis com pelo menos a metragem especificada.

**Exemplo:**
```bash
GET /api/listings?minSquareMeters=100
GET /api/listings?minSquareMeters=200
```

**cURL:**
```bash
curl "http://localhost:3000/api/listings?minSquareMeters=100"
```

### 8. Filtro por Faixa de Preço (`minPrice` e `maxPrice`)

Filtra os imóveis por faixa de preço. Você pode usar apenas um dos filtros ou ambos.

**Exemplo:**
```bash
GET /api/listings?minPrice=500000
GET /api/listings?maxPrice=2000000
GET /api/listings?minPrice=500000&maxPrice=2000000
```

**cURL:**
```bash
# Apenas preço mínimo
curl "http://localhost:3000/api/listings?minPrice=500000"

# Apenas preço máximo
curl "http://localhost:3000/api/listings?maxPrice=2000000"

# Faixa de preço completa
curl "http://localhost:3000/api/listings?minPrice=500000&maxPrice=2000000"
```

### 9. Combinando Filtros

Você pode combinar múltiplos filtros na mesma requisição.

**Exemplo:**
```bash
GET /api/listings?type=house&search=piscina
GET /api/listings?type=apartment&search=rio de janeiro
GET /api/listings?country=Brasil&search=Sudeste&minBedrooms=3
GET /api/listings?country=Brasil&city=Rio de Janeiro&minBedrooms=3
GET /api/listings?minPrice=500000&maxPrice=2000000&minBedrooms=3&minBathrooms=2
```

**cURL:**
```bash
curl "http://localhost:3000/api/listings?type=house&search=piscina"
curl "http://localhost:3000/api/listings?type=apartment&search=leblon"
curl "http://localhost:3000/api/listings?country=Brasil&search=Sudeste&minBedrooms=3"
curl "http://localhost:3000/api/listings?country=Brasil&city=Rio de Janeiro&minBedrooms=3"
curl "http://localhost:3000/api/listings?minPrice=500000&maxPrice=2000000&minBedrooms=3&minBathrooms=2"
```

## Exemplos de Uso

### 1. Listar todas as casas
```bash
curl "http://localhost:3000/api/listings?type=house"
```

### 2. Listar apartamentos
```bash
curl "http://localhost:3000/api/listings?type=apartment"
```

### 3. Buscar imóveis com piscina
```bash
curl "http://localhost:3000/api/listings?search=piscina"
```

### 4. Buscar casas com piscina
```bash
curl "http://localhost:3000/api/listings?type=house&search=piscina"
```

### 5. Buscar imóveis no Rio de Janeiro
```bash
curl "http://localhost:3000/api/listings?search=rio de janeiro"
```

### 6. Buscar penthouses em São Paulo
```bash
curl "http://localhost:3000/api/listings?type=penthouse&search=são paulo"
```

### 7. Buscar casas no Brasil com no mínimo 4 quartos
```bash
curl "http://localhost:3000/api/listings?type=house&country=Brasil&minBedrooms=4"
```

### 8. Buscar apartamentos no Rio de Janeiro com 3+ quartos e 2+ banheiros
```bash
curl "http://localhost:3000/api/listings?type=apartment&city=Rio de Janeiro&minBedrooms=3&minBathrooms=2"
```

### 9. Buscar imóveis com preço entre R$ 500.000 e R$ 2.000.000
```bash
curl "http://localhost:3000/api/listings?minPrice=500000&maxPrice=2000000"
```

### 10. Buscar casas grandes (200m²+) com piscina na faixa de preço médio-alto
```bash
curl "http://localhost:3000/api/listings?type=house&search=piscina&minSquareMeters=200&minPrice=1000000&maxPrice=3000000"
```

### 11. Buscar apartamentos de luxo (3+ quartos, 2+ banheiros, 150m²+) em São Paulo
```bash
curl "http://localhost:3000/api/listings?type=apartment&city=São Paulo&minBedrooms=3&minBathrooms=2&minSquareMeters=150&minPrice=800000"
```

## Resumo dos Filtros Disponíveis

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `type` | String | Tipo do imóvel (house, apartment, penthouse, loft) | `type=house` |
| `search` | String | Busca em título, descrição, cidade, bairro, região e país | `search=piscina` |
| `country` | String | Filtro exato por país | `country=Brasil` |
| `city` | String | Filtro exato por cidade | `city=Rio de Janeiro` |
| `minBedrooms` | Number | Número mínimo de quartos | `minBedrooms=3` |
| `minBathrooms` | Number | Número mínimo de banheiros | `minBathrooms=2` |
| `minSquareMeters` | Number | Metragem mínima em m² | `minSquareMeters=100` |
| `minPrice` | Number | Preço mínimo | `minPrice=500000` |
| `maxPrice` | Number | Preço máximo | `maxPrice=2000000` |

## Resposta

A resposta mantém o mesmo formato JSON padrão:

```json
[
  {
    "id": 1,
    "title": "Penthouse Exclusiva com Vista Panorâmica para o Mar",
    "type": "penthouse",
    "price": "8200000",
    "description": "Cobertura triplex de alto padrão...",
    "city": "Rio de Janeiro",
    "neighborhood": "Leblon",
    "region": "RJ",
    "country": "Brasil",
    "bedrooms": 4,
    "bathrooms": 5,
    "squareMeters": 480,
    "images": [...],
    "contactPhone": "55981234567",
    "contactEmail": "mariana.silva@example.com",
    "createdAt": "2025-11-06T...",
    "updatedAt": "2025-11-06T..."
  }
]
```

## Distribuição de Tipos nos Seeders

- **house**: 8 imóveis (IDs: 2, 3, 4, 6, 7, 8, 11, 13, 14)
- **apartment**: 2 imóveis (IDs: 9, 15)
- **penthouse**: 3 imóveis (IDs: 1, 5, 10)
- **loft**: 1 imóvel (ID: 12)

## Notas

- Os filtros são opcionais - se nenhum filtro for fornecido, todos os listings serão retornados
- A busca de texto é case-insensitive e usa LIKE pattern matching
- Os resultados são ordenados por data de criação (mais recentes primeiro)
