# 🤝 Contributing

Thank you for contributing to the AI Research Synthesis Engine.

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
git commit -m "feat: implement claim extraction"
git commit -m "fix: resolve PDF upload issue"
git commit -m "docs: update README"
git commit -m "refactor: improve synthesis pipeline"
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
├── api/         # API routes
├── services/    # Business logic
├── models/      # Data models
├── uploads/     # Uploaded PDFs
├── vectorstore/ # ChromaDB storage
└── data/        # Generated outputs

frontend/
├── components/  # Reusable UI components
├── pages/       # Application pages
├── services/    # API calls
├── hooks/       # Custom React hooks
└── layouts/     # Page layouts
```

---

## Commit Convention

| Type     | Example                             |
| -------- | ----------------------------------- |
| Feature  | `feat: add paper search`            |
| Fix      | `fix: resolve upload bug`           |
| Refactor | `refactor: simplify chunking logic` |
| Docs     | `docs: update README`               |
| Test     | `test: add synthesis validation`    |

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
* Groq
* Python-dotenv
* Sentence-Transformers
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

---

## 🔑 External APIs & Services

### arXiv API

Used for:

* Research paper discovery
* Paper metadata retrieval

No API key required.

---

### Groq API

Used for:

* Claim extraction
* Theme generation
* Research brief generation

Required:

```env
GROQ_API_KEY=your_api_key
```

---

### ChromaDB

Used for:

* Vector storage
* Semantic search
* Similarity retrieval

Runs locally. No API key required.

---

## ⚙️ Environment Setup

Create:

```text
backend/.env
```

Add:

```env
GROQ_API_KEY=your_groq_api_key
```

---

## 🚀 Quick Start

Backend:

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Frontend:

```bash
cd frontend

npm install

npm run dev
```

Backend:

```text
http://127.0.0.1:8000
```

Frontend:

```text
http://localhost:5173
```
