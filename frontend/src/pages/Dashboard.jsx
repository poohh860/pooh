const { useState, useEffect } = React;
const { useNavigate } = ReactRouterDOM;

function Dashboard() {
  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    loadCollections();
  }, [navigate]);

  const loadCollections = async () => {
    try {
      const response = await window.api.getCollections();
      setCollections(response.data);
      if (response.data.length > 0 && !selectedCollectionId) {
        setSelectedCollectionId(response.data[0].id.toString());
      }
    } catch (error) {
      console.error('Error loading collections:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    loadCollections();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Dashboard</h1>
      <div className="dashboard">
        <div>
          <DocumentUpload onUploadSuccess={handleUploadSuccess} />
          <div className="card">
            <h2 className="card-title">Your Documents</h2>
            {collections.length === 0 ? (
              <p>No documents uploaded yet. Upload your first PDF to get started!</p>
            ) : (
              <>
                <ul className="collections-list">
                  {collections.map((collection) => (
                    <li key={collection.id} className="collection-item">
                      <div>
                        <strong>{collection.document_name}</strong>
                        <br />
                        <small style={{ color: '#7f8c8d' }}>
                          Collection: {collection.collection_name}
                        </small>
                        <br />
                        <small style={{ color: '#7f8c8d' }}>
                          Uploaded: {new Date(collection.created_at).toLocaleDateString()}
                        </small>
                      </div>
                    </li>
                  ))}
                </ul>
                {collections.length > 1 && (
                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label className="form-label">Select Document for Chat</label>
                    <select
                      className="form-input"
                      value={selectedCollectionId}
                      onChange={(e) => setSelectedCollectionId(e.target.value)}
                    >
                      {collections.map((collection) => (
                        <option key={collection.id} value={collection.id}>
                          {collection.document_name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div>
          <Chatbot collectionId={selectedCollectionId} />
        </div>
      </div>
    </div>
  );
}


