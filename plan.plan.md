<!-- 807e18d9-5c4b-47f5-8efb-3e136bda78df e0a95e61-93c8-419e-9ca3-8c0b7e524221 -->
# RAG as a Service - Implementation Plan

## Tech Stack

**Backend:**

- FastAPI (Python web framework)
- ChromaDB (vector database for embeddings)
- LangChain (RAG pipeline orchestration)
- Hugging Face Transformers (free LLM model - Mistral-7B-Instruct or similar)
- SQLAlchemy + SQLite (user authentication & metadata)
- PyPDF2 or pdfplumber (PDF parsing)
- python-jose + passlib (JWT authentication)
- python-multipart (file uploads)
- email-validator + smtplib (OTP verification)

**Frontend:**

- React + Vite (UI framework)
- React Router (routing)
- Axios (API calls)
- Custom CSS/styling (no framework)

**Infrastructure:**

- Python 3.10+
- Node.js 18+

## Project Structure

```
pooh/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app entry
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py          # User SQLAlchemy model
│   │   │   └── collection.py    # Collection metadata model
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── user.py          # Pydantic schemas
│   │   │   └── rag.py           # Request/response schemas
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py          # Auth endpoints (register, login, verify OTP)
│   │   │   ├── documents.py     # PDF upload & chunking
│   │   │   └── chat.py          # Question-answering endpoint
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py  # Authentication logic
│   │   │   ├── chroma_service.py # ChromaDB operations
│   │   │   ├── rag_service.py   # RAG pipeline (chunking, retrieval, generation)
│   │   │   └── email_service.py # OTP email sending
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py        # Settings & environment variables
│   │   │   ├── security.py      # JWT & password hashing
│   │   │   └── database.py      # SQLAlchemy setup
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── pdf_parser.py    # PDF text extraction
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   └── DocumentUpload.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── HowToUse.jsx
│   │   │   ├── ApiDoc.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js            # Axios API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── README.md
└── .gitignore
```

## Implementation Steps

### Phase 1: Backend Setup & Authentication

1. **Setup FastAPI project structure**

   - Initialize FastAPI app with CORS middleware
   - Configure SQLAlchemy with SQLite database
   - Create user model (email, hashed_password, is_verified, otp_code, otp_expiry)
   - Implement JWT token generation/verification

2. **Authentication API endpoints**

   - `POST /api/auth/register` - Create account (email + password, generate OTP)
   - `POST /api/auth/verify-otp` - Verify OTP and activate account
   - `POST /api/auth/login` - Login (email + password, return JWT)
   - `POST /api/auth/refresh` - Refresh JWT token
   - Email service for sending OTP codes

### Phase 2: ChromaDB Integration & PDF Processing

3. **ChromaDB service**

   - Initialize ChromaDB client
   - Create collection management (one per user document)
   - Implement embedding storage and retrieval

4. **PDF processing service**

   - Extract text from PDF using PyPDF2/pdfplumber
   - Chunk text using LangChain's text splitter (RecursiveCharacterTextSplitter)
   - Generate embeddings using Hugging Face sentence-transformers
   - Store chunks in ChromaDB with metadata (user_id, document_name)

5. **Document upload API**

   - `POST /api/documents/upload` - Accept PDF, process, store in ChromaDB
   - Return collection_id/name to frontend
   - Store document metadata in SQLite

### Phase 3: RAG Pipeline

6. **RAG service implementation**

   - Load free Hugging Face model (e.g., Mistral-7B-Instruct via transformers)
   - Implement retrieval: query embedding → similarity search in ChromaDB
   - Implement generation: retrieved context + question → LLM response
   - Use LangChain for orchestration (RetrievalQA chain)

7. **Chat API endpoint**

   - `POST /api/chat/ask` - Accept question + collection_id
   - Retrieve relevant chunks, generate answer, return response

### Phase 4: Frontend Development

8. **Frontend setup**

   - Initialize React + Vite project
   - Setup routing (React Router)
   - Create layout with navbar
   - Configure Axios with base URL and JWT interceptors

9. **Static pages (Public - No Login Required)**

   - Home page:
     - Project title/logo
     - Brief intro to RAG-as-a-Service
     - Key features/benefits
     - Call-to-action buttons (Register/Login)
     - Navigation to other pages
   - About Us page:
     - Project description
     - Use case: companies can upload privacy policies and route user queries
     - Technology overview
     - Team/company info (if applicable)
   - How to Use page:
     - Step-by-step guide (create account, verify OTP, upload PDF, ask questions)
   - API Documentation page:
     - List of API endpoints
     - Request/response formats
     - Authentication details
     - Example requests

10. **Authentication UI**

    - Register page:
      - Email (Gmail) input
      - Password and confirm password fields
      - Submit button
      - Link to Login page
      - OTP input field (appears after registration)
    - Login page:
      - Email input
      - Password input
      - Login button
      - Link to Register page
    - Protected routes middleware (redirect to login if not authenticated)

11. **Dashboard & Chatbot (Protected - After Login)**

    - Navigation bar (on all pages):
      - Logo/Project name
      - Links: Home, About, How to Use, API Doc
      - Login/Register buttons (when not logged in)
      - Dashboard button (when logged in)
      - Logout button (when logged in)
    - Dashboard page with two main sections:
      - Document Management Section:
        - "Upload PDF" area (drag & drop or file picker)
        - List of uploaded documents/collections:
          - Collection name/ID
          - Upload date
          - Status (processed/processing)
          - Option to delete (optional)
      - Chatbot Section:
        - Collection selector dropdown (if multiple documents)
        - Chat interface:
          - Message history (question-answer pairs)
          - Input field for new questions
          - Send button
          - Loading indicator while processing
        - Chat messages display:
          - User questions (right-aligned or distinct style)
          - AI answers (left-aligned or distinct style)
    - Common UI elements:
      - Notifications/Alerts:
        - Success messages (e.g., "Document uploaded successfully")
        - Error messages (e.g., "Invalid credentials")
        - OTP verification status
      - Footer (optional):
        - Copyright info
        - Additional links

### Phase 5: Integration & Polish

12. **Connect frontend to backend**

    - Wire up all API calls
    - Error handling and loading states
    - Responsive design

13. **Testing & Documentation**

    - Test complete flow: register → verify → upload → chat
    - Update README with setup instructions
    - Environment variable documentation

## Key Files to Create

**Backend:**

- `backend/app/main.py` - FastAPI app initialization
- `backend/app/api/auth.py` - Authentication endpoints
- `backend/app/api/documents.py` - PDF upload endpoint
- `backend/app/api/chat.py` - Question-answering endpoint
- `backend/app/services/rag_service.py` - Core RAG logic
- `backend/app/services/chroma_service.py` - ChromaDB operations

**Frontend:**

- `frontend/src/pages/Home.jsx` - Landing page
- `frontend/src/pages/Dashboard.jsx` - User dashboard with upload & chat
- `frontend/src/components/Chatbot.jsx` - Chat interface
- `frontend/src/services/api.js` - API client

## Environment Variables

**Backend (.env):**

- `DATABASE_URL` - SQLite path
- `SECRET_KEY` - JWT secret
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` - Email config
- `CHROMA_DB_PATH` - ChromaDB storage path
- `HUGGINGFACE_MODEL` - Model name (e.g., "mistralai/Mistral-7B-Instruct-v0.2")

## Dependencies

**Backend (requirements.txt):**

- fastapi, uvicorn
- sqlalchemy, python-jose, passlib
- chromadb, langchain, langchain-community
- transformers, torch (for Hugging Face model)
- sentence-transformers (for embeddings)
- PyPDF2 or pdfplumber
- python-multipart, email-validator

**Frontend (package.json):**

- react, react-dom, react-router-dom
- axios
- vite
- tailwindcss (optional, for styling)

### To-dos

- [ ] Setup FastAPI project structure with SQLAlchemy, JWT auth, and database models
- [ ] Implement authentication endpoints (register, verify OTP, login) with email service
- [ ] Integrate ChromaDB service for vector storage and retrieval
- [ ] Implement PDF parsing, chunking, and embedding generation with LangChain
- [ ] Build RAG service using Hugging Face model for question-answering
- [ ] Create document upload API endpoint that processes PDFs and returns collection ID
- [ ] Create chat API endpoint for question-answering using RAG pipeline
- [ ] Initialize React + Vite project with routing and API client setup
- [ ] Create Home, About, How to Use, and API Documentation pages
- [ ] Build Register and Login pages with OTP verification flow
- [ ] Create Dashboard with document upload and chatbot interface
- [ ] Connect frontend to backend APIs with error handling and polish UI