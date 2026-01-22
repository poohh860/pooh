function About() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title">About InfoBot</h1>
        <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
          InfoBot is a powerful platform that enables companies and individuals to transform
          their documents into intelligent question-answering systems using Retrieval Augmented Generation (RAG) technology.
        </p>
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#2c3e50' }}>
          What is RAG?
        </h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
          Retrieval Augmented Generation (RAG) combines the power of information retrieval with large language models.
          Instead of relying solely on the model's training data, RAG retrieves relevant context from your documents
          and uses it to generate accurate, context-aware answers.
        </p>
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#2c3e50' }}>
          Use Case: Privacy Policy Q&A
        </h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
          Companies can upload their privacy policies and other important documents to this service.
          When users have questions, they can be routed to this system, which will provide accurate answers
          based on the uploaded documents. This ensures consistent, reliable responses while reducing the burden
          on customer support teams.
        </p>
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#2c3e50' }}>
          Technology Stack
        </h2>
        <ul style={{ lineHeight: '2', paddingLeft: '2rem' }}>
          <li><strong>Backend:</strong> FastAPI (Python web framework)</li>
          <li><strong>Vector Database:</strong> ChromaDB for storing document embeddings</li>
          <li><strong>RAG Pipeline:</strong> LangChain for orchestration</li>
          <li><strong>LLM:</strong> Hugging Face Transformers (free models)</li>
          <li><strong>Frontend:</strong> React</li>
          <li><strong>Authentication:</strong> JWT-based with OTP email verification</li>
        </ul>
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#2c3e50' }}>
          Key Features
        </h2>
        <ul style={{ lineHeight: '2', paddingLeft: '2rem' }}>
          <li>Secure user authentication with email verification</li>
          <li>PDF document upload and processing</li>
          <li>Automatic text chunking and embedding generation</li>
          <li>Intelligent question-answering with source retrieval</li>
          <li>RESTful API for easy integration</li>
          <li>User-friendly web interface</li>
        </ul>
      </div>
    </div>
  );
}


