## Resolução do Teste

## Sumário

* [Estrutura do Repositório](#-estrutura-do-repositório)
* [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
* [Como Executar Localmente (sem Docker)](#-como-executar-localmente-sem-docker)
* [Como Executar com Docker Compose](#-como-executar-com-docker-compose)
* [Endpoints Disponíveis](#-endpoints-disponíveis)

---

## Estrutura do Repositório

```bash
/senior
├── _docker-compose/       # Docker Compose com docker-compose.yml e scripts auxiliares
├── backend/               # API Flask + SQLAlchemy + SQLite
│   ├── app.py             # Entrypoint da aplicação
│   ├── db/                # Conexão e base do banco
│   ├── models/            # Modelos do ORM
│   ├── schemas/           # Schemas de serialização
│   ├── services/          # Lógica de negócio e acesso ao banco
│   ├── requirements.txt   # Dependências do Python
│   └── Dockerfile         # Dockerfile para o backend
├── frontend/              # Next.js + Tailwind + TypeScript
│   ├── codes/             # Código-fonte do frontend
│   └── Dockerfile         # Dockerfile para o frontend
└── readme.md              # Este arquivo
```

---

## Tecnologias Utilizadas

### Backend

* Python 3.9
* Flask + Flask-CORS
* SQLAlchemy + SQLite
* Docker

### Frontend

* Next.js
* TypeScript
* TailwindCSS
* shadcn/ui
* @tanstack/react-table
* lodash (debounce)

---

## Como Executar Localmente (sem Docker)

### Backend

```bash
cd senior/backend
python3 -m venv .venv
source .venv/bin/activate  # Linux/macOS

pip install -r requirements.txt
python app.py
```

Acesse: [http://localhost:5000/api/v1/books](http://localhost:5000/api/v1/books)

### Frontend

```bash
cd senior/frontend/codes
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)


# Como Executar com Docker Compose

Pré-requisitos: **Docker** e **Docker Compose** instalados.

## Build das imagens

Antes de subir o ambiente, é necessário gerar as imagens Docker do **frontend** e do **backend**:

```bash
cd senior/frontend
./build.bash

cd ../backend
./build.bash
```

## Subir os containers

Após o build das imagens, execute o Docker Compose:

```bash
cd ../_docker-compose
./docker-up.bash
```

Os serviços ficarão disponíveis em:

* **Frontend**: [http://localhost:3000](http://localhost:3000)
* **Backend**: [http://localhost:5000/api/v1/books](http://localhost:5000)

## Parar o ambiente

Para parar os containers:

```bash
docker compose down
```

## Endpoints Disponíveis

### `GET /`

Endpoint de teste:

```
Hello, World!
```

---

### `GET /api/v1/books`

Parâmetros opcionais:

* `title`, `author`, `author_bio`: filtros parciais
* `page`: número da página (default: 1)
* `page_size`: resultados por página (default: 10)

Exemplo:

```
GET /api/v1/books?author=george&title=1984&page=1&page_size=5
```

---

### `POST /api/v1/books`

Cria um novo livro.

**Body JSON:**

```json
{
  "title": "Título do Livro",
  "author": "Nome do Autor",
  "author_bio": "Biografia do Autor"
}
```

---

### `GET /api/v1/authors`

Lista todos os autores:

```
GET /api/v1/authors
```

