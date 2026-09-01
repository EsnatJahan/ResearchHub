# ResearchHub Backend 🚀

Backend API server for **ResearchHub AI**, built with **NestJS 11**, **Prisma ORM 6**, and **PostgreSQL**.

---

## 🛠 Features

- **Authentication Module**: Secure registration, login, and logout using `@nestjs/jwt`, `bcrypt`, and HTTP cookies.
- **Projects Module**: Full CRUD for research workspaces and linking papers via `ProjectPaper`.
- **Papers Module**: Research paper PDF uploads, notes storage, and associations.
- **Datasets Module**: Multi-format dataset upload (`.csv`, `.tsv`, `.xlsx`, `.docx`, `.json`) with automated static storage.
- **Security & Validation**: Global `ValidationPipe` with `class-validator`, CORS configuration, and `JwtGuard`.

---

## 🚀 Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend/` directory:
```env
DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/<DATABASE_NAME>?schema=public"
```

### 3. Database Migration
```bash
npx prisma db push
# or
npx prisma migrate dev
```

### 4. Run the Server
```bash
# Development (with auto-reload)
npm run start:dev

# Production
npm run build
npm run start:prod
```
The API server will run on `http://localhost:3001`.

---

## 📡 API Endpoints

### Auth
- `POST /auth/register` — Register new user
- `POST /auth/login` — Log in user & receive cookie
- `POST /auth/logout` — Clear session cookie

### Projects
- `GET /projects` — List user's projects
- `POST /projects` — Create project
- `GET /projects/:id` — Get project details & linked papers
- `PATCH /projects/:id` — Update project
- `DELETE /projects/:id` — Delete project
- `POST /projects/:id/papers` — Upload & link paper to project
- `POST /projects/:id/papers/:paperId` — Link existing paper
- `DELETE /projects/:id/papers/:paperId` — Unlink paper from project

### Papers
- `GET /paper` — List all papers
- `POST /paper` — Upload paper (PDF + note)
- `GET /paper/:id` — Get paper details
- `DELETE /paper/:id` — Delete paper

### Datasets
- `GET /dataset` — List all datasets
- `POST /dataset` — Upload dataset file
- `GET /dataset/:id` — Get dataset details
- `PATCH /dataset/:id` — Update dataset details
- `DELETE /dataset/:id` — Delete dataset & remove file
