from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..core.security import verify_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..schemas.rag import DocumentUploadResponse
from ..models.user import User
from ..models.collection import Collection
from ..services.rag_service import rag_service
from ..utils.pdf_parser import extract_text_from_pdf
import uuid
from datetime import datetime

router = APIRouter(prefix="/api/documents", tags=["documents"])
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


@router.post("/upload", response_model=DocumentUploadResponse)
def upload_document(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload and process PDF document."""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are supported"
        )
    
    # Extract text from PDF
    try:
        text = extract_text_from_pdf(file.file)
        if not text.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="PDF appears to be empty or could not be parsed"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error parsing PDF: {str(e)}"
        )
    
    # Generate unique collection name
    collection_name = f"user_{current_user.id}_{uuid.uuid4().hex[:8]}"
    
    # Process and store document
    try:
        rag_service.process_and_store_document(
            text=text,
            collection_name=collection_name,
            document_name=file.filename,
            user_id=current_user.id
        )
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error processing document: {error_details}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing document: {str(e)}"
        )
    
    # Save collection metadata
    collection = Collection(
        collection_name=collection_name,
        document_name=file.filename,
        user_id=current_user.id
    )
    db.add(collection)
    db.commit()
    db.refresh(collection)
    
    return DocumentUploadResponse(
        collection_id=str(collection.id),
        collection_name=collection_name,
        message="Document uploaded and processed successfully"
    )


@router.get("/collections")
def get_collections(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all collections for current user."""
    collections = db.query(Collection).filter(Collection.user_id == current_user.id).all()
    return [
        {
            "id": col.id,
            "collection_name": col.collection_name,
            "document_name": col.document_name,
            "created_at": col.created_at.isoformat()
        }
        for col in collections
    ]

