const { useState } = React;

function DocumentUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      setMessage({ type: 'error', text: 'Please upload a PDF file' });
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setMessage({ type: '', text: '' });
      } else {
        setMessage({ type: 'error', text: 'Please select a PDF file' });
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a file' });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await window.api.uploadDocument(file);
      setMessage({
        type: 'success',
        text: `Document uploaded successfully! Collection: ${response.data.collection_name}`,
      });
      setFile(null);
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.detail || 'Error uploading document',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Upload PDF Document</h2>
      <div
        className={`upload-area ${dragging ? 'dragover' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input" style={{ cursor: 'pointer', width: '100%', display: 'block' }}>
          {file ? (
            <div>
              <p>Selected: {file.name}</p>
              <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                Click to change file
              </p>
            </div>
          ) : (
            <div>
              <p>Drag and drop a PDF file here, or click to select</p>
              <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                Only PDF files are supported
              </p>
            </div>
          )}
        </label>
      </div>
      {file && (
        <button
          className="btn btn-primary"
          onClick={handleUpload}
          disabled={uploading}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
        </button>
      )}
      {message.text && (
        <div className={`alert alert-${message.type === 'error' ? 'error' : 'success'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}


