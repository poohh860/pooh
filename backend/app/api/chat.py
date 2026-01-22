from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..core.security import verify_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..schemas.rag import ChatRequest, ChatResponse
from ..models.user import User
from ..models.collection import Collection
from ..services.rag_service import rag_service

router = APIRouter(prefix="/api/chat", tags=["chat"])
security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Get current authenticated user."""
    token = credentials.credentials
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    email = payload.get("sub")
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user


@router.post("/ask", response_model=ChatResponse)
def ask_question(
    chat_request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Ask a question and get answer using RAG."""
    # Verify collection belongs to user
    collection = db.query(Collection).filter(
        Collection.id == int(chat_request.collection_id),
        Collection.user_id == current_user.id
    ).first()
    
    if not collection:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Collection not found or access denied"
        )
    
    # Generate answer using RAG
    result = rag_service.generate_answer(
        question=chat_request.question,
        collection_name=collection.collection_name
    )
    
    return ChatResponse(
        answer=result["answer"],
        sources=result.get("sources", [])
    )

