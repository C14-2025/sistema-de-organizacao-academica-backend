# 📌 Sistema de Organização Acadêmica

Este projeto é um backend em **Node.js** utilizando **Express** e **Prisma** para a disciplina de C14 do Inatel

---

## 🚀 Passo a passo para rodar o servidor

### 1. Pré-requisitos

- Node.js instalado (versão LTS recomendada, 18+)
- Banco de dados MySQL

### 2. Clone o repositório

```
https://github.com/KauaMB2/c14-backend.git
```

### 3. Acesse a pasta do projeto

```
cd c14-backend
```

### 4. Instale as dependências:

```
npm install
```

### 5. Crie o arquivo .env na raiz do projeto e defina a URL para o backend:

```
DATABASE_URL=mysql://USER:PASSWORD@localhost:PORT/DATABASE
```

### 6. Gere o Prisma Client:

```
npx prisma generate
```

### 7. Gere o banco de dados no MySQL:

```
npx prisma migrate dev
```

### 8. Rodando o servidor

```
npm run dev
```
