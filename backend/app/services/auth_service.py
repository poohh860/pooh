from sqlalchemy.orm import Session
from ..models.user import User
from ..core.security import get_password_hash, verify_password


def create_user(db: Session, email: str, password: str) -> User:
    """Create a new user (no OTP verification)."""
    hashed_password = get_password_hash(password)
    
    user = User(
        email=email,
        hashed_password=hashed_password,
        is_verified=True  # Auto-verify for development
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return user


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    """Authenticate user and return user object if valid."""
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def get_user_by_email(db: Session, email: str) -> User | None:
    """Get user by email."""
    return db.query(User).filter(User.email == email).first()

