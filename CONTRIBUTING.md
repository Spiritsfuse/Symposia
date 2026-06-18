# 🤝 Contributing

Thank you for contributing to Symposia.

## Workflow

1. Create a new branch
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes

3. Test locally

Backend:
```bash
uvicorn main:app --reload
```

Frontend:
```bash
npm run dev
```

4. Commit using conventional commits

Examples:
```bash
git commit -m "feat: implement workspace search"
git commit -m "fix: resolve PDF parse error handling"
git commit -m "docs: update deployment instructions"
git commit -m "refactor: optimize provider abstractions"
```

5. Push your branch
```bash
git push origin feature/your-feature-name
```

6. Create a Pull Request

---

## Project Structure

```text
backend/
├── api/         # API routes (analysis, papers, PDFs)
├── services/    # Business logic (briefs, claims, chunking)
│   └── providers/ # Abstractions for AI models (Gemini)
├── uploads/     # Uploaded PDFs (cleared on duplicate analysis)
├── vectorstore/ # ChromaDB persistent local database
└── data/        # Generated JSON & brief data files

frontend/
├── components/  # Reusable React components (Brief, Claims, Common, Papers, Upload)
├── pages/       # Application views (Home, Workspace, NotFound)
├── services/    # API network utilities
├── hooks/       # Custom React hooks (usePaperSearch, usePaperAnalysis)
└── layouts/     # Workspace and Main navigation layouts
```

---

## Commit Convention

| Type     | Example                             |
| -------- | ----------------------------------- |
| Feature  | `feat: add workspace search`        |
| Fix      | `fix: resolve upload boundary bug`  |
| Refactor | `refactor: clean up provider files` |
| Docs     | `docs: update setup instructions`   |
| Test     | `test: add integration test suite`  |

---

## 📦 Requirements & Dependencies

### Backend Dependencies

Install using:
```bash
pip install -r requirements.txt
```

Core packages:
* FastAPI
* Uvicorn
* Pydantic
* Requests
* arXiv
* PyMuPDF
* Python-dotenv
* ChromaDB

---

### Frontend Dependencies

Install using:
```bash
npm install
```

Core packages:
* React
* Vite
* React Router DOM
* Axios
* React Query
* Tailwind CSS
* React Hook Form
* Lucide React

---

## 🔑 External APIs & Services

### arXiv API
Used for dynamic research paper discovery. No API key required.

---

### Gemini API
Used for embeddings, claim extraction, theme synthesis, and brief generation.
Required environment variables:
```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_LLM_MODEL=gemini-3.1-flash-lite
GEMINI_EMBEDDING_MODEL=gemini-embedding-2
```

---

### ChromaDB
Used for semantic claim indexing and local workspace search. Runs locally without external services.

---

## ⚙️ Environment Setup

Create `backend/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_LLM_MODEL=gemini-3.1-flash-lite
GEMINI_EMBEDDING_MODEL=gemini-embedding-2
ENV=development
```

---

## 🚀 Quick Start

Backend:
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r ..\requirements.txt
uvicorn main:app --reload
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

Backend endpoint: `http://127.0.0.1:8000`
Frontend endpoint: `http://localhost:5173`
