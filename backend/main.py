#!/usr/bin/env python3
"""
Main entry point for running the RAG as a Service backend.
Run with: python main.py
"""

import uvicorn
from app.core.config import settings

if __name__ == "__main__":
    print(f"Starting RAG as a Service API server...")
    print(f"Host: {settings.HOST}")
    print(f"Port: {settings.PORT}")
    print(f"CORS Origins: {settings.ALLOWED_ORIGINS}")
    # Show localhost for documentation URL (more user-friendly)
    doc_host = "localhost" if settings.HOST == "0.0.0.0" else settings.HOST
    print(f"API Documentation: http://{doc_host}:{settings.PORT}/docs")
    print("-" * 50)
    
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.RELOAD
    )

