from pydantic import BaseModel
from typing import Optional


class DocumentUploadResponse(BaseModel):
    collection_id: str
    collection_name: str
    message: str


class ChatRequest(BaseModel):
    question: str
    collection_id: str


class ChatResponse(BaseModel):
    answer: str
    sources: Optional[list] = None

