from pydantic_settings import BaseSettings
from typing import Optional, List


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite:///./rag_service.db"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Email (SMTP)
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    SMTP_FROM_EMAIL: Optional[str] = None
    
    # ChromaDB
    CHROMA_DB_PATH: str = "./chroma_db"
    
    # Hugging Face
    HUGGINGFACE_MODEL: str = "mistralai/Mistral-7B-Instruct-v0.2"
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"
    
    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    RELOAD: bool = True
    
    # CORS Configuration
    # If ALLOWED_ORIGINS is empty or "*", allow all origins
    # Otherwise, provide comma-separated list: "http://localhost:3000,http://localhost:5173"
    ALLOWED_ORIGINS: str = "*"  # Default: allow all origins
    
    class Config:
        env_file = ".env"
        case_sensitive = True
    
    def get_cors_origins(self) -> List[str]:
        """Get CORS allowed origins list."""
        if not self.ALLOWED_ORIGINS or self.ALLOWED_ORIGINS.strip() == "*":
            return ["*"]  # Allow all origins
        # Split by comma and strip whitespace
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]


settings = Settings()

