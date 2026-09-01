# ResearchHub Frontend 💻

Modern scientific research workspace interface built with **Next.js 16 (App Router)**, **React 19**, **TypeScript 5**, and **Tailwind CSS v4**.

---

## 🛠 Features

- **App Router Architecture**: Dynamic routing for dashboard modules (`/dashboard/projects`, `/dashboard/papers`, `/dashboard/datasets`).
- **Route Guarding**: Next.js Edge `middleware.ts` protecting dashboard routes using JWT cookies.
- **In-Browser Dataset Viewer**:
  - **CSV & TSV**: Fast tabular preview with filtering and pagination via `PapaParse`.
  - **Excel (`.xlsx`, `.xls`)**: Multi-sheet parser and viewer via `SheetJS (XLSX)`.
  - **Word (`.docx`)**: Clean HTML rendering via `Mammoth`.
  - **JSON**: Interactive JSON tree viewer.
- **Paper & Project Modals**: Interactive modals for uploading papers, attaching notes, and managing project resources.
- **Toast Notifications**: Built-in notification feedback via `Sonner`.

---

## 🚀 Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Key Routes

- `/` — Landing page
- `/login` — User login
- `/register` — Account registration
- `/dashboard` — Researcher dashboard overview
- `/dashboard/projects` — Research projects list & project workspace
- `/dashboard/papers` — Research papers repository & modal reader
- `/dashboard/datasets` — Dataset management & multi-format data viewer
