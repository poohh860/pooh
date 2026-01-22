const { Link } = ReactRouterDOM;

function Home() {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <h1>InfoBot</h1>
          <p>Transform your documents into intelligent Q&A systems</p>
          <div>
            <Link to="/register" className="btn btn-primary" style={{ marginRight: '1rem' }}>
              Get Started
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="features">
          <div className="feature-card">
            <h3>📄 Document Processing</h3>
            <p>
              Upload your PDF documents and let our AI process them into searchable knowledge bases.
            </p>
          </div>
          <div className="feature-card">
            <h3>🤖 Intelligent Q&A</h3>
            <p>
              Ask questions about your documents and get accurate, context-aware answers powered by RAG.
            </p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure & Private</h3>
            <p>
              Your documents are processed securely. Each user has their own isolated collections.
            </p>
          </div>
          <div className="feature-card">
            <h3>🚀 Easy Integration</h3>
            <p>
              Simple REST API for easy integration into your existing applications and workflows.
            </p>
          </div>
        </div>
        <div className="card" style={{ marginTop: '3rem' }}>
          <h2 className="card-title">Use Cases</h2>
          <ul style={{ lineHeight: '2', paddingLeft: '2rem' }}>
            <li>Companies can upload privacy policies and route user queries</li>
            <li>Legal document Q&A systems</li>
            <li>Technical documentation assistants</li>
            <li>Research paper analysis</li>
            <li>Customer support knowledge bases</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


