import chromadb
from chromadb.config import Settings
from typing import List, Dict, Optional
from ..core.config import settings as app_settings


class ChromaService:
    def __init__(self):
        self.client = chromadb.PersistentClient(
            path=app_settings.CHROMA_DB_PATH,
            settings=Settings(anonymized_telemetry=False)
        )
        self.embeddings = None
    
    def set_embeddings(self, embeddings):
        """Set the embeddings model to use."""
        self.embeddings = embeddings
    
    def create_collection(self, collection_name: str, embeddings=None) -> chromadb.Collection:
        """Create or get a collection."""
        try:
            collection = self.client.get_collection(name=collection_name)
        except:
            # Use default embedding function if no custom embeddings provided
            collection = self.client.create_collection(name=collection_name)
        return collection
    
    def add_documents(
        self,
        collection_name: str,
        documents: List[str],
        metadatas: List[Dict],
        ids: List[str],
        embeddings: Optional[List[List[float]]] = None
    ):
        """Add documents to a collection."""
        collection = self.create_collection(collection_name)
        
        # If embeddings are provided, use them; otherwise ChromaDB will use default
        if embeddings:
            collection.add(
                documents=documents,
                metadatas=metadatas,
                ids=ids,
                embeddings=embeddings
            )
        else:
            collection.add(
                documents=documents,
                metadatas=metadatas,
                ids=ids
            )
        return collection
    
    def query_collection(
        self,
        collection_name: str,
        query_texts: List[str],
        n_results: int = 3
    ) -> Dict:
        """Query a collection for similar documents."""
        collection = self.client.get_collection(name=collection_name)
        results = collection.query(
            query_texts=query_texts,
            n_results=n_results
        )
        return results
    
    def delete_collection(self, collection_name: str):
        """Delete a collection."""
        try:
            self.client.delete_collection(name=collection_name)
        except:
            pass


chroma_service = ChromaService()

