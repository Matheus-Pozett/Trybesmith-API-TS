# ⚔️ Trybesmith API (TypeScript)

API REST para gerenciamento de uma loja medieval fictícia, desenvolvida com **Node.js**, **TypeScript**, **Express** e **Sequelize**.

Este projeto expõe endpoints para:
- cadastro e listagem de produtos;
- listagem de usuários com seus produtos;
- autenticação com JWT.

---

## 📌 Sobre o projeto

A aplicação segue uma arquitetura em camadas, separando responsabilidades entre:
- **Rotas** (`routes`)
- **Controllers** (`controllers`)
- **Services** (`services`)
- **Models** (`database/models`)
- **Middlewares** (`middleware`)

Também possui testes unitários e de integração para validar os principais fluxos.

---

## 🧰 Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Sequelize + MySQL
- JWT (`jsonwebtoken`)
- Bcrypt (`bcryptjs`)
- Joi
- Docker / Docker Compose
- Jest, Mocha, Chai, Sinon, Supertest

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js `>=16`
- npm `>=7`
- Docker e Docker Compose (opcional, mas recomendado)

### 1) Clonar o repositório

```bash
git clone <url-do-seu-repositorio>
cd Trybesmith-API-TS
```

### 2) Instalar dependências

```bash
npm install
```

### 3) Configurar variáveis de ambiente

A aplicação usa as seguintes variáveis:

| Variável | Valor padrão |
|---|---|
| `DB_USER` | `root` |
| `DB_PASSWORD` | `password` |
| `DB_HOST` | `localhost` |
| `DB_PORT` | `3306` |
| `DB_NAME` | `Trybesmith` |
| `JWT_SECRET` | `seusecretdetoken` |

> Se estiver utilizando Docker Compose do projeto, essas variáveis já são configuradas no serviço da API.

### 4) Subir com Docker (recomendado)

```bash
docker-compose up -d --build
```

Depois, para preparar o banco:

```bash
docker exec -it trybesmith_api bash
npm run db:reset
```

### 5) Rodar localmente (sem Docker)

Certifique-se de que o MySQL esteja ativo e com as credenciais corretas.

```bash
npm run db:reset
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3001
```

---

## 📚 Endpoints

## `POST /products`
Cria um novo produto.

### Body
```json
{
  "name": "Martelo de Thor",
  "price": "30 peças de ouro",
  "userId": 1
}
```

### Resposta (`201`)
```json
{
  "id": 6,
  "name": "Martelo de Thor",
  "price": "30 peças de ouro",
  "userId": 1
}
```

---

## `GET /products`
Lista todos os produtos.

### Resposta (`200`)
```json
[
  {
    "id": 1,
    "name": "Excalibur",
    "price": "10 peças de ouro",
    "userId": 1
  }
]
```

---

## `GET /users`
Lista usuários e os IDs de produtos associados.

### Resposta (`200`)
```json
[
  {
    "username": "Hagar",
    "productIds": [1, 2]
  }
]
```

---

## `POST /login`
Autentica um usuário e retorna token JWT.

### Body
```json
{
  "username": "valid_user",
  "password": "valid_password"
}
```

### Resposta de sucesso (`201`)
```json
{
  "token": "<jwt_token>"
}
```

### Erros comuns
- `400` quando `username` ou `password` não são enviados:
```json
{ "message": "\"username\" and \"password\" are required" }
```
- `401` quando credenciais são inválidas:
```json
{ "message": "Username or password invalid" }
```

---

## ✅ Scripts úteis

```bash
# desenvolvimento
npm run dev

# build TypeScript
npm run build

# resetar banco (drop/create/migrate/seed)
npm run db:reset

# testes
npm test
npm run test:local
npm run test:coverage

# lint
npm run lint
```

---

## 🧪 Testes

O projeto possui:
- testes unitários de **services** e **controllers**;
- testes de integração dos endpoints principais.

Para rodar a suíte principal:

```bash
npm test
```

---

## 📁 Estrutura de pastas

```txt
src/
  app.ts
  server.ts
  controllers/
  services/
  routes/
  middleware/
  database/
    config/
    migrations/
    models/
    seeders/
  utils/
  types/

tests/
  integration/
  unit/
```

---

## 👨‍💻 Autor

Desenvolvido por **Trybesmith-API-TS**.

Se este projeto te ajudou, deixe uma ⭐ no repositório.
