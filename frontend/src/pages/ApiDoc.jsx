function ApiDoc() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title">API Documentation</h1>
        <p style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
          This API provides endpoints for authentication, document management, and question-answering.
          All endpoints return JSON responses.
        </p>
        
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#2c3e50' }}>
          Base URL
        </h2>
        <code style={{ 
          display: 'block', 
          padding: '1rem', 
          background: '#f8f9fa', 
          borderRadius: '4px',
          marginBottom: '2rem'
        }}>
          http://localhost:8000
        </code>
        
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#2c3e50' }}>
          Authentication
        </h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
          Most endpoints require authentication. Include the JWT token in the Authorization header:
        </p>
        <code style={{ 
          display: 'block', 
          padding: '1rem', 
          background: '#f8f9fa', 
          borderRadius: '4px',
          marginBottom: '2rem'
        }}>
          Authorization: Bearer {'<token>'}
        </code>
        
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#2c3e50' }}>
          Authentication Endpoints
        </h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>POST /api/auth/register</h3>
          <p style={{ marginBottom: '0.5rem' }}>Register a new user account.</p>
          <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Request Body:</p>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`{
  "email": "user@example.com",
  "password": "securepassword"
}`}
          </pre>
          <p style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Response:</p>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`{
  "message": "User registered successfully. Please check your email for OTP.",
  "email": "user@example.com"
}`}
          </pre>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>POST /api/auth/verify-otp</h3>
          <p style={{ marginBottom: '0.5rem' }}>Verify OTP and activate account.</p>
          <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Request Body:</p>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`{
  "email": "user@example.com",
  "otp_code": "123456"
}`}
          </pre>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>POST /api/auth/login</h3>
          <p style={{ marginBottom: '0.5rem' }}>Login and get access token.</p>
          <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Request Body:</p>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`{
  "email": "user@example.com",
  "password": "securepassword"
}`}
          </pre>
          <p style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Response:</p>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}`}
          </pre>
        </div>
        
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#2c3e50' }}>
          Document Endpoints (Requires Authentication)
        </h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>POST /api/documents/upload</h3>
          <p style={{ marginBottom: '0.5rem' }}>Upload and process a PDF document.</p>
          <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Request:</p>
          <p style={{ marginBottom: '0.5rem' }}>Multipart form data with file field</p>
          <p style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Response:</p>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`{
  "collection_id": "1",
  "collection_name": "user_1_a1b2c3d4",
  "message": "Document uploaded and processed successfully"
}`}
          </pre>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>GET /api/documents/collections</h3>
          <p style={{ marginBottom: '0.5rem' }}>Get all collections for the authenticated user.</p>
          <p style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Response:</p>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`[
  {
    "id": 1,
    "collection_name": "user_1_a1b2c3d4",
    "document_name": "privacy_policy.pdf",
    "created_at": "2026-01-01T12:00:00"
  }
]`}
          </pre>
        </div>
        
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#2c3e50' }}>
          Chat Endpoints (Requires Authentication)
        </h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>POST /api/chat/ask</h3>
          <p style={{ marginBottom: '0.5rem' }}>Ask a question about a document collection.</p>
          <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Request Body:</p>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`{
  "question": "What is the privacy policy regarding data collection?",
  "collection_id": "1"
}`}
          </pre>
          <p style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Response:</p>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`{
  "answer": "Based on the provided context: The privacy policy states that...",
  "sources": ["user_1_a1b2c3d4_chunk_0", "user_1_a1b2c3d4_chunk_1"]
}`}
          </pre>
        </div>
        
        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#2c3e50' }}>
          Error Responses
        </h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
          All endpoints may return error responses with the following format:
        </p>
        <pre style={{ 
          background: '#f8f9fa', 
          padding: '1rem', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
{`{
  "detail": "Error message description"
}`}
          </pre>
        <p style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          Common HTTP status codes:
        </p>
        <ul style={{ lineHeight: '2', paddingLeft: '2rem' }}>
          <li><strong>400:</strong> Bad Request (invalid input)</li>
          <li><strong>401:</strong> Unauthorized (missing or invalid token)</li>
          <li><strong>404:</strong> Not Found (resource doesn't exist)</li>
          <li><strong>500:</strong> Internal Server Error</li>
        </ul>
      </div>
    </div>
  );
}


