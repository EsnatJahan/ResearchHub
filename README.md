# ResearchHub AI 🔬

> A modern, full-stack scientific research workspace designed to streamline project management, research paper indexing, and in-browser multi-format dataset analysis.

---

## 📑 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [License](#-license)

---

## 🌟 Overview

**ResearchHub AI** is an all-in-one workspace for researchers, academics, and data scientists. It bridges the gap between literature tracking, project organization, and dataset exploration by offering:
- Centralized research project workspaces.
- Research paper repository with notes and PDF storage.
- In-browser interactive preview for datasets (**CSV, TSV, Excel, Word, JSON**) without needing third-party desktop tools.
- Secure, cookie-based JWT authentication with edge route protection.

---

## ✨ Key Features

### 🔐 1. Authentication & Security
- User registration and login with **Bcrypt password hashing**.
- Stateless **JWT authentication** issued as secure HTTP-only cookies.
- **Edge Middleware Route Protection** safeguarding all `/dashboard/*` routes on the frontend.
- **JwtAuthGuard** on the backend to enforce authorization across protected endpoints.

### 📁 2. Research Projects Workspace
- Create, view, update, and manage research project workspaces.
- Associate multiple research papers with projects via a many-to-many relation (`ProjectPaper`).
- Live workspace metrics displaying connected papers, datasets, notes, and resources.

### 📄 3. Research Paper Management
- Upload and archive research paper PDFs via **Multer**.
- Attach customized research notes and metadata to papers.
- Associate papers across multiple active projects.

### 📊 4. In-Browser Multi-Format Dataset Viewer
- Upload datasets in multiple formats (`.csv`, `.tsv`, `.xlsx`, `.xls`, `.docx`, `.json`).
- **CSV & TSV**: Fast parsing and tabular grid view with search, pagination, and sorting via **PapaParse**.
- **Excel (`.xlsx`, `.xls`)**: Multi-sheet workbook parsing via **SheetJS (XLSX)**.
- **Word (`.docx`)**: Client-side conversion to clean, semantic HTML via **Mammoth**.
- **JSON**: Structured interactive JSON data tree viewer.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Parsers & Engines**:
  - [PapaParse](https://www.papaparse.com/) (CSV / TSV)
  - [XLSX / SheetJS](https://sheetjs.com/) (Excel)
  - [Mammoth.js](https://github.com/mwilliamson/mammoth.js) (DOCX to HTML)

### Backend
- **Framework**: [NestJS 11](https://nestjs.com/)
- **Database ORM**: [Prisma ORM 6](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: `@nestjs/jwt`, `bcrypt`, `cookie-parser`
- **Validation**: `class-validator`, `class-transformer`
- **File Uploads**: `multer`

---

## 🏛 System Architecture

```
   ┌────────────────────────────────────────────────────────┐
   │             Frontend (Next.js 16 + React 19)           │
   │  - Tailwind CSS v4   - Lucide Icons   - Sonner Toasts  │
   │  - PapaParse (CSV)   - SheetJS (XLSX) - Mammoth (.docx)│
   │  - Edge Middleware Route Protection (/dashboard/*)     │
   └───────────────────────────▲────────────────────────────┘
                               │ HTTP / REST / Cookie Auth
   ┌───────────────────────────▼────────────────────────────┐
   │                  Backend (NestJS 11)                   │
   │  - JWT & Bcrypt Auth - Multer File Upload Stream       │
   │  - Class Validator   - Static Asset File Serving       │
   └───────────────────────────▲────────────────────────────┘
                               │ Prisma Client
   ┌───────────────────────────▼────────────────────────────┐
   │                 PostgreSQL Database                    │
   │  - Users  - Projects  - Papers  - ProjectPapers        │
   │  - Datasets                                            │
   └────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
ResearchHub/
├── backend/                  # NestJS REST API Server
│   ├── prisma/               # Prisma schema & migrations
│   │   └── schema.prisma
│   ├── src/
│   │   ├── auth/             # Auth module (JWT, login, register, guard)
│   │   ├── dataset/          # Dataset upload & management module
│   │   ├── paper/            # Paper upload & notes module
│   │   ├── projects/         # Research projects module
│   │   ├── prisma/           # Prisma service & database client
│   │   └── main.ts           # Backend entry point
│   ├── uploads/              # Static file storage (PDFs, datasets)
│   └── package.json
│
├── frontend/                 # Next.js 16 Web Application
│   ├── app/
│   │   ├── dashboard/        # Protected dashboard pages
│   │   │   ├── datasets/     # Dataset list & multi-format viewer
│   │   │   ├── papers/       # Paper library & modal viewer
│   │   │   └── projects/     # Project overview & sub-modules
│   │   ├── login/            # User login page
│   │   ├── register/         # User registration page
│   │   └── page.tsx          # Landing page
│   ├── components/           # Reusable UI components & modals
│   ├── middleware.ts         # Route protection middleware
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) database running locally or remotely

---

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create or configure your `.env` file in the `backend/` directory:
   ```env
   DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/<DATABASE_NAME>?schema=public"
   ```

4. Run Prisma database migrations to create the tables:
   ```bash
   npx prisma db push
   # or
   npx prisma migrate dev
   ```

5. Start the backend development server:
   ```bash
   npm run start:dev
   ```
   *The backend API will run on `http://localhost:3001`.*

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend application will run on `http://localhost:3000`.*

---

## ⚙ Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:password@localhost:5432/ResearchHub?schema=public` |

---

## 🔌 API Reference

### Authentication (`/auth`)
- `POST /auth/register` — Register a new user account.
- `POST /auth/login` — Authenticate and receive `access_token` cookie.
- `POST /auth/logout` — Clear session cookie.

### Projects (`/projects`)
- `GET /projects` — Retrieve all projects for the authenticated user.
- `POST /projects` — Create a new project.
- `GET /projects/:id` — Get project details including associated papers.
- `PATCH /projects/:id` — Update project metadata.
- `DELETE /projects/:id` — Remove a project.
- `POST /projects/:id/papers` — Upload and link a paper directly to a project.
- `POST /projects/:id/papers/:paperId` — Attach an existing paper to a project.
- `DELETE /projects/:id/papers/:paperId` — Detach a paper from a project.

### Papers (`/paper`)
- `GET /paper` — Retrieve all uploaded papers.
- `POST /paper` — Upload a research paper (PDF) with notes.
- `GET /paper/:id` — Get a specific paper.
- `DELETE /paper/:id` — Remove paper and delete uploaded PDF.

### Datasets (`/dataset`)
- `GET /dataset` — Retrieve all uploaded datasets.
- `POST /dataset` — Upload a new dataset (`.csv`, `.tsv`, `.xlsx`, `.docx`, `.json`).
- `GET /dataset/:id` — Get dataset details.
- `PATCH /dataset/:id` — Update dataset metadata.
- `DELETE /dataset/:id` — Remove dataset and delete file from disk.

---

## 📄 License
This project is private and for educational / research purposes.

