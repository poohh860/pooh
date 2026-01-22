from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.database import engine, Base
from .core.config import settings
from .api import auth, documents, chat

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="RAG as a Service",
    description="RAG (Retrieval Augmented Generation) service API",
    version="1.0.0"
)

# CORS middleware - allow all origins by default for small projects
cors_origins = settings.get_cors_origins()
# If "*" is in origins, we can't use allow_credentials=True
# For small projects, we'll allow all origins without credentials restriction
if "*" in cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,  # Can't use credentials with wildcard
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include routers
app.include_router(auth.router)
app.include_router(documents.router)
app.include_router(chat.router)


@app.get("/")
def root():
    return {"message": "RAG as a Service API", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"status": "healthy"}


# Run server if executed directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.RELOAD
    )

