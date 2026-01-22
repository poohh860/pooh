import PyPDF2
from typing import List


def extract_text_from_pdf(pdf_file) -> str:
    """Extract text from PDF file."""
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() + "\n"
    return text

