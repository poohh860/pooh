// API service
const API_BASE_URL = 'http://localhost:8000';

// Helper function to get auth token
function getAuthToken() {
  return localStorage.getItem('token');
}

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '#/login';
      return null;
    }
    
    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth endpoints
async function register(email, password) {
  return apiCall('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}


async function login(email, password) {
  const result = await apiCall('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (result && result.data.access_token) {
    localStorage.setItem('token', result.data.access_token);
  }
  return result;
}

// Document endpoints
async function uploadDocument(file) {
  const formData = new FormData();
  formData.append('file', file);
  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}/api/documents/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '#/login';
    return null;
  }
  
  return response.json();
}

async function getCollections() {
  return apiCall('/api/documents/collections', {
    method: 'GET'
  });
}

// Chat endpoints
async function askQuestion(question, collectionId) {
  return apiCall('/api/chat/ask', {
    method: 'POST',
    body: JSON.stringify({
      question,
      collection_id: collectionId
    })
  });
}

