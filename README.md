# ask-the-papers
<div align="center">

![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge\&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge\&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge\&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge\&logo=vite)
![Groq](https://img.shields.io/badge/Groq-LLM_API-F55036?style=for-the-badge)
![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector_DB-7B61FF?style=for-the-badge)
![arXiv](https://img.shields.io/badge/arXiv-Research_Source-B31B1B?style=for-the-badge\&logo=arxiv)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

### From 50 research papers to one coherent research brief.

An AI-powered platform that discovers research papers, extracts structured claims, identifies consensus across sources, and generates research briefs with citation traceability.

</div>

---

# 📖 Table of Contents

* [Problem Statement](#-problem-statement)
* [Project Overview](#-project-overview)
* [Features](#-features)
* [System Architecture](#-system-architecture)
* [Tech Stack](#-tech-stack)
* [Workflow](#-workflow)
* [Project Structure](#-project-structure)
* [API Endpoints](#-api-endpoints)
* [Installation](#-installation)
* [Environment Variables](#-environment-variables)
* [Example Output](#-example-output)
* [How This Differs From Traditional RAG](#-how-this-differs-from-traditional-rag)
* [Future Improvements](#-future-improvements)
* [Contributors](#-contributors)

---

# 🎯 Problem Statement

Researchers, students, and professionals face a common challenge:

> Information overload.

A literature review often requires reading dozens of papers, extracting important findings, comparing methodologies, identifying areas of agreement and disagreement, and finally producing a coherent summary.

This process is:

* Time-consuming
* Repetitive
* Difficult to scale
* Prone to missing important insights

The AI Research Synthesis Engine automates this workflow by:

1. Discovering relevant research papers.
2. Extracting structured claims from papers.
3. Comparing findings across sources.
4. Detecting consensus and conflicts.
5. Generating a structured research brief.

---

# 🚀 Project Overview

The AI Research Synthesis Engine is designed to transform research papers into actionable knowledge.

Instead of reading dozens of papers manually, users can:

* Search for relevant papers
* Upload research PDFs
* Extract findings automatically
* Identify research trends
* Generate structured literature-review style briefs

The system emphasizes:

✅ Claim Extraction

✅ Cross-Paper Synthesis

✅ Consensus Detection

✅ Citation Traceability

✅ Research Brief Generation

---

# ✨ Features

## 📚 Research Paper Discovery

Search academic papers from arXiv using natural language research queries.

Example:

```text
How can RAG reduce hallucinations in LLMs?
```

---

## 📄 PDF Ingestion

Upload research papers directly into the platform.

Capabilities:

* PDF parsing
* Page extraction
* Structured document processing

---

## ✂️ Intelligent Chunking

Research papers are divided into manageable semantic chunks.

Benefits:

* Improved LLM performance
* Reduced context window usage
* Better retrieval quality

---

## 🧠 Claim Extraction

Extracts structured research claims including:

* Findings
* Limitations
* Hypotheses
* Future Work

Example:

```json
{
  "claim": "RAG reduced hallucinations by 35%",
  "claim_type": "finding",
  "page_number": 5,
  "chunk_id": "chunk_14"
}
```

---

## 🔍 Semantic Search

Uses vector embeddings to retrieve semantically similar claims.

Example:

Query:

```text
hallucination reduction
```

Can match:

```text
RAG reduces hallucinations
```

even without exact keyword overlap.

---

## 🔗 Cross-Paper Synthesis

Groups similar claims across multiple papers.

Identifies:

* Shared findings
* Emerging themes
* Evidence clusters

---

## 📊 Consensus Detection

Measures agreement across research papers.

Consensus levels:

* Weak
* Moderate
* Strong

---

## 📝 Research Brief Generation

Automatically generates:

* Executive Summary
* Key Findings
* Areas of Consensus
* Areas of Conflict
* Research Gaps
* Future Research Directions

---

## 📌 Citation Traceability

Every extracted claim retains:

* Source paper
* Page number
* Chunk identifier

Ensuring traceable and explainable outputs.

---

# 🏗️ System Architecture

```text
Research Query
        ↓
Paper Discovery (arXiv)
        ↓
PDF Upload
        ↓
PDF Parsing
        ↓
Chunking
        ↓
Claim Extraction (Groq LLM)
        ↓
Embeddings
        ↓
Vector Search (ChromaDB)
        ↓
Cross-Paper Synthesis
        ↓
Consensus Detection
        ↓
Research Brief Generation
```

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Query
* Axios

## Backend

* FastAPI
* Python

## AI & NLP

* Groq API
* Llama 3.3 70B
* Sentence Transformers

## Vector Database

* ChromaDB

## Research Sources

* arXiv

## PDF Processing

* PyMuPDF

## Deployment

* Vercel (Frontend)
* Render (Backend)

---

# 🔄 Workflow

## Step 1 — Search Papers

User enters a research question.

Example:

```text
RAG hallucination mitigation
```

System searches arXiv and returns relevant papers.

---

## Step 2 — Upload PDF

User uploads a research paper.

```text
paper.pdf
```

---

## Step 3 — Document Processing

System:

* Extracts pages
* Chunks content
* Preserves citation metadata

---

## Step 4 — Claim Extraction

Claims are extracted using LLMs.

Example:

```json
{
  "claim": "Retrieval improves factual accuracy",
  "claim_type": "finding"
}
```

---

## Step 5 — Semantic Analysis

Claims are embedded and indexed.

Enables:

* Similarity search
* Theme grouping

---

## Step 6 — Synthesis

Related claims are grouped into themes.

Example:

```text
Benefits of Retrieval
```

---

## Step 7 — Research Brief

Final literature-review style report is generated.

---

# 📂 Project Structure

```text
research-synthesis-engine/

├── backend/
│
│   ├── api/
│   │
│   ├── services/
│   │
│   ├── models/
│   │
│   ├── uploads/
│   │
│   ├── vectorstore/
│   │
│   └── data/
│
├── frontend/
│
├── README.md
│
├── requirements.txt
│
└── .gitignore
```

---

# 🔌 API Endpoints

## GET /

Backend status endpoint.

Response:

```json
{
  "message": "Research Synthesis Engine"
}
```

---

## GET /health

Health check endpoint.

Response:

```json
{
  "status": "healthy"
}
```

---

## GET /papers/search

Search papers from arXiv.

Example:

```http
GET /papers/search?query=llm+hallucinations
```

Response:

```json
[
  {
    "title": "...",
    "authors": [],
    "summary": "...",
    "published": "...",
    "pdf_url": "..."
  }
]
```

---

## POST /analyze-paper

Upload and analyze a research paper.

Returns:

* Claims
* Synthesis
* Research Brief

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/research-synthesis-engine.git

cd research-synthesis-engine
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run server:

```bash
uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

Create:

```text
backend/.env
```

Example:

```env
GROQ_API_KEY=your_groq_api_key
```

---

# 📋 Example Output

## Claim

```json
{
  "claim": "RAG reduced hallucinations by 35%",
  "claim_type": "finding",
  "page_number": 5,
  "chunk_id": "chunk_14"
}
```

---

## Synthesis

```json
{
  "theme": "Benefits of Retrieval",
  "consensus": "strong",
  "supporting_claims": 5
}
```

---

## Research Brief

```text
Executive Summary

Retrieval-based methods consistently improve
factual accuracy and reduce hallucinations.

Key Findings

- Retrieval improves grounding
- RAG reduces hallucinations
- Tool use improves reliability

Research Gaps

- Limited multilingual evaluation

Future Research

- Large-scale multilingual benchmarks
```

---

# 🔥 How This Differs From Traditional RAG

## Traditional RAG

```text
Retrieve Documents
        ↓
Answer Question
```

Focus:

* Question answering
* Retrieval

---

## Research Synthesis Engine

```text
Retrieve Papers
        ↓
Extract Claims
        ↓
Compare Findings
        ↓
Detect Consensus
        ↓
Generate Research Brief
```

Focus:

* Literature review
* Research synthesis
* Consensus detection
* Citation traceability

This project goes beyond retrieval by performing structured research analysis.

---

# 🚧 Future Improvements

* Multi-paper batch analysis
* Semantic Scholar integration
* Knowledge graph visualization
* PDF report export
* Research timeline generation
* Citation graph analysis
* User authentication
* Team collaboration features
* Research workspace persistence
* Advanced consensus scoring

---

# 🏆 Assignment Requirements Mapping

| Requirement               | Status         |
| ------------------------- | -------------- |
| Paper Discovery           | ✅              |
| Document Ingestion        | ✅              |
| Claim Extraction          | ✅              |
| Cross-Source Synthesis    | ✅              |
| Consensus Detection       | ✅              |
| Research Brief Generation | ✅              |
| Citation Traceability     | ✅              |
| Export Support            | 🚧 Future Work |

---

# 📜 License

This project is licensed under the MIT License.

---


