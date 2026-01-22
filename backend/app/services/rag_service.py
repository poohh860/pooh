from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import HuggingFacePipeline
from transformers import pipeline
from typing import List, Dict
from ..services.chroma_service import chroma_service
from ..core.config import settings


class RAGService:
    def __init__(self):
        # Lazy initialization - don't load models until needed
        self.embeddings = None
        self.llm = None
        self._embeddings_initialized = False
        self._llm_initialized = False
    
    def _init_embeddings(self):
        """Lazy initialization of embeddings model."""
        if not self._embeddings_initialized:
            try:
                print("Initializing embeddings model...")
                self.embeddings = HuggingFaceEmbeddings(
                    model_name=settings.EMBEDDING_MODEL
                )
                self._embeddings_initialized = True
                print("Embeddings model loaded successfully")
            except Exception as e:
                print(f"Error loading embeddings model: {e}")
                raise
    
    def _init_llm(self):
        """Lazy initialization of LLM model."""
        if not self._llm_initialized:
            try:
                print("Initializing LLM model...")
                self.llm = self._load_llm()
                self._llm_initialized = True
                print("LLM model loaded successfully")
            except Exception as e:
                print(f"Warning: Could not load LLM model: {e}")
                print("Using a fallback model or API-based approach")
                self.llm = None
                self._llm_initialized = True
    
    def _load_llm(self):
        """Load Hugging Face LLM model."""
        # Use a smaller, free model that can run locally
        # For simplicity, we'll use a text generation pipeline
        try:
            # Try to use a lightweight model
            model_name = "gpt2"  # Small and fast
            pipe = pipeline(
                "text-generation",
                model=model_name,
                max_length=200,
                temperature=0.7,
                device=-1  # Use CPU
            )
            return HuggingFacePipeline(pipeline=pipe)
        except Exception as e:
            print(f"Error loading model: {e}")
            print("Using fallback text-based response")
            # Fallback to a simple text-based response
            return None
    
    def chunk_text(self, text: str, chunk_size: int = 1000, chunk_overlap: int = 200) -> List[str]:
        """Split text into chunks."""
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len
        )
        chunks = text_splitter.split_text(text)
        return chunks
    
    def process_and_store_document(
        self,
        text: str,
        collection_name: str,
        document_name: str,
        user_id: int
    ) -> str:
        """Process document, create chunks, generate embeddings, and store in ChromaDB."""
        # Initialize embeddings if not already done
        self._init_embeddings()
        
        # Chunk the text
        chunks = self.chunk_text(text)
        print(f"Created {len(chunks)} chunks from document")
        
        # Generate embeddings and store
        documents = []
        metadatas = []
        ids = []
        
        for i, chunk in enumerate(chunks):
            documents.append(chunk)
            metadatas.append({
                "user_id": user_id,
                "document_name": document_name,
                "chunk_index": i
            })
            ids.append(f"{collection_name}_chunk_{i}")
        
        # Generate embeddings for documents
        print(f"Generating embeddings for {len(documents)} chunks...")
        try:
            embeddings_list = self.embeddings.embed_documents(documents)
            print(f"Generated {len(embeddings_list)} embeddings")
        except Exception as e:
            print(f"Error generating embeddings: {e}")
            # Fallback: let ChromaDB use default embeddings
            embeddings_list = None
        
        # Store in ChromaDB
        print(f"Storing {len(documents)} documents in ChromaDB...")
        chroma_service.add_documents(
            collection_name=collection_name,
            documents=documents,
            metadatas=metadatas,
            ids=ids,
            embeddings=embeddings_list
        )
        print("Documents stored successfully")
        
        return collection_name
    
    def generate_answer(self, question: str, collection_name: str) -> Dict:
        """Generate answer using RAG pipeline."""
        try:
            # Initialize LLM if not already done
            self._init_llm()
            
            # Initialize embeddings if not already done (needed for query embedding)
            self._init_embeddings()
            
            # Generate embedding for the question
            try:
                query_embedding = self.embeddings.embed_query(question)
            except Exception as e:
                print(f"Error generating query embedding: {e}")
                query_embedding = None
            
            # Query ChromaDB for relevant chunks
            if query_embedding:
                # Use custom embedding for query
                collection = chroma_service.client.get_collection(name=collection_name)
                results = collection.query(
                    query_embeddings=[query_embedding],
                    n_results=3
                )
            else:
                # Fallback to text-based query
                results = chroma_service.query_collection(
                    collection_name=collection_name,
                    query_texts=[question],
                    n_results=3
                )
            
            # Extract context from results
            if results['documents'] and len(results['documents'][0]) > 0:
                context = "\n\n".join(results['documents'][0])
                sources = results.get('ids', [])[0] if results.get('ids') else []
            else:
                context = "No relevant context found."
                sources = []
            
            # Generate answer
            if self.llm:
                prompt = f"""Based on the following context, answer the question. If the answer is not in the context, say so.

Context: {context}

Question: {question}

Answer:"""
                try:
                    result = self.llm(prompt)
                    if isinstance(result, str):
                        answer = result
                    elif isinstance(result, dict) and 'generated_text' in result:
                        answer = result['generated_text']
                    elif isinstance(result, list) and len(result) > 0:
                        answer = result[0].get('generated_text', str(result[0]))
                    else:
                        answer = str(result)
                    # Clean up the answer (remove the prompt if it's included)
                    if prompt in answer:
                        answer = answer.replace(prompt, "").strip()
                except Exception as e:
                    print(f"Error generating answer with LLM: {e}")
                    answer = f"Based on the provided context: {context[:500]}..."
            else:
                # Fallback: simple context-based response
                answer = f"Based on the provided context: {context[:500]}..."
            
            return {
                "answer": answer,
                "sources": sources
            }
        except Exception as e:
            return {
                "answer": f"Error generating answer: {str(e)}",
                "sources": []
            }


rag_service = RAGService()

