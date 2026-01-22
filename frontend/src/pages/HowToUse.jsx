function HowToUse() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title">How to Use InfoBot</h1>
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Step 1: Create an Account</h2>
          <p style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
            Click on the "Register" button in the navigation bar. Enter your email address (Gmail recommended)
            and create a secure password. After submitting, you'll receive an OTP code via email.
          </p>
          
          <h2 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Step 2: Verify Your Email</h2>
          <p style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
            Check your email inbox for the OTP (One-Time Password) code. Enter this code in the verification
            form to activate your account. The OTP expires after 10 minutes.
          </p>
          
          <h2 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Step 3: Login</h2>
          <p style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
            Once your account is verified, log in using your email and password. You'll be redirected to your dashboard.
          </p>
          
          <h2 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Step 4: Upload a PDF Document</h2>
          <p style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
            In the dashboard, you'll see the document upload section. You can either:
          </p>
          <ul style={{ lineHeight: '2', paddingLeft: '2rem', marginBottom: '2rem' }}>
            <li>Drag and drop a PDF file into the upload area, or</li>
            <li>Click to browse and select a PDF file from your computer</li>
          </ul>
          <p style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
            Once uploaded, the system will automatically:
          </p>
          <ul style={{ lineHeight: '2', paddingLeft: '2rem', marginBottom: '2rem' }}>
            <li>Extract text from the PDF</li>
            <li>Split it into manageable chunks</li>
            <li>Generate embeddings for semantic search</li>
            <li>Store everything in a vector database</li>
          </ul>
          <p style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
            You'll receive a collection name/ID that identifies your processed document.
          </p>
          
          <h2 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Step 5: Ask Questions</h2>
          <p style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
            In the chatbot section of the dashboard, select the document collection you want to query (if you have multiple).
            Type your question in the input field and click "Send" or press Enter. The system will:
          </p>
          <ul style={{ lineHeight: '2', paddingLeft: '2rem', marginBottom: '2rem' }}>
            <li>Search for relevant chunks in your document</li>
            <li>Retrieve the most relevant context</li>
            <li>Generate an answer using the retrieved context</li>
            <li>Display the answer in the chat interface</li>
          </ul>
          
          <h2 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Tips for Best Results</h2>
          <ul style={{ lineHeight: '2', paddingLeft: '2rem' }}>
            <li>Ask specific questions related to the content of your document</li>
            <li>Use natural language - the system understands conversational queries</li>
            <li>For multiple documents, upload them separately and select the relevant collection</li>
            <li>Wait for the document processing to complete before asking questions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


