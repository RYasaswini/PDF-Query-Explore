# 📚 PDF Question Answering App

A full-stack application that allows users to upload PDF files and ask questions about their content using natural language processing (LangChain / LlamaIndex).

---

## 🔧 Tech Stack

- **Frontend**: React + Vite + TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **Backend**: FastAPI
- **NLP**: LangChain or LlamaIndex
- **PDF Parsing**: PyMuPDF
- **Database**: SQLite or PostgreSQL
- **Storage**: Local or AWS S3 (for uploaded PDFs)

---

## 📦 Features

- Upload PDF documents
- Ask questions related to a specific PDF
- Display accurate, NLP-based answers
- Follow-up questions on the same document
- Responsive and clean UI

---

## 📁 Folder Structure
```text
.
├── public/                   # Static files (e.g. favicon, index.html)
├── src/                      # React source files
│   └── ...                   # Your components/pages go here
├── components.json           # shadcn/ui registry config
├── index.html                # Root HTML file
├── package.json              # NPM package config
├── bun.lockb                 # Bun lock file (if using Bun)
├── eslint.config.js          # ESLint configuration
├── postcss.config.js         # PostCSS for Tailwind CSS
├── tailwind.config.ts        # Tailwind CSS config
├── tsconfig.json             # TypeScript global config
├── tsconfig.app.json         # App-specific TypeScript config
├── tsconfig.node.json        # Node-specific TypeScript config
├── vite.config.ts            # Vite config for bundling
├── .gitignore                # Git ignored files
└── README.md                 # Project documentation
```
## Setup Backend (FastAPI)

- cd backend
- python -m venv venv
- source venv/bin/activate  # Windows: venv\Scripts\activate
- pip install -r requirements.txt
- uvicorn main:app --reload
  
## Setup Frontend (React)

- cd frontend
- npm install
- npm run dev

## API Overview
- POST	/upload	Upload a PDF file
- POST	/ask	Ask a question on a PDF
- GET	/documents	List uploaded documents


