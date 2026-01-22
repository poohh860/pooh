# INfobot

A full-stack Retrieval Augmented Generation (RAG) application. Users can upload PDF documents, and the system will process them into searchable knowledge bases that can answer questions using AI.

## Features

- User authentication with email verification (OTP)
- PDF document upload and processing
- Automatic text chunking and embedding generation
- Intelligent question-answering using RAG
- RESTful API for easy integration
- Modern web interface

## Tech Stack

### Backend
- FastAPI (Python web framework)
- ChromaDB (vector database)
- LangChain (RAG pipeline)
- Hugging Face Transformers (free LLM models)
- SQLAlchemy + SQLite (user data)
- JWT authentication

### Frontend
- React + Vite
- React Router
- Axios
- Custom CSS

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

5. Update the `.env` file with your settings (optional for SMTP, defaults work for development)

6. Run the backend server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

**Note:** The server configuration (host, port, CORS) can be customized in the `.env` file.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to localhost:8000):
```bash
echo "VITE_API_URL=http://localhost:8000" > .env
```

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Usage

1. Register a new account with your email
2. Verify your email using the OTP code (check console if SMTP not configured)
3. Login to your account
4. Upload a PDF document in the dashboard
5. Wait for processing to complete
6. Ask questions about your document in the chatbot

## API Documentation

See the API Documentation page in the web interface or visit `/api-doc` route.

## Development Notes

- If SMTP is not configured, OTP codes will be printed to the console
- The system uses free Hugging Face models that may require significant RAM/GPU
- For production, consider using cloud-based LLM APIs or inference services
- ChromaDB data is stored locally in the `chroma_db` directory
- CORS is configured to allow all origins by default (`ALLOWED_ORIGINS=*` in `.env`)
- Server host and port can be configured in `.env` (default: `0.0.0.0:8000`)

## License

MIT

