import smtplib
import random
import string
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from ..core.config import settings


def generate_otp(length: int = 6) -> str:
    """Generate a random OTP code."""
    return ''.join(random.choices(string.digits, k=length))


def get_otp_expiry(minutes: int = 10) -> datetime:
    """Get OTP expiry time."""
    return datetime.utcnow() + timedelta(minutes=minutes)


def send_otp_email(email: str, otp_code: str) -> bool:
    """Send OTP code via email."""
    if not settings.SMTP_HOST or not settings.SMTP_USER:
        # If SMTP not configured, print OTP (for development)
        print(f"OTP for {email}: {otp_code}")
        return True
    
    try:
        msg = MIMEMultipart()
        msg['From'] = settings.SMTP_FROM_EMAIL or settings.SMTP_USER
        msg['To'] = email
        msg['Subject'] = "RAG Service - OTP Verification"
        
        body = f"""
        Your OTP verification code is: {otp_code}
        
        This code will expire in 10 minutes.
        
        If you did not request this code, please ignore this email.
        """
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        text = msg.as_string()
        server.sendmail(settings.SMTP_FROM_EMAIL or settings.SMTP_USER, email, text)
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

