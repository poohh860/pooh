const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const register = (email, password) => {
  return api.post('/api/auth/register', { email, password });
};

export const verifyOTP = (email, otpCode) => {
  return api.post('/api/auth/verify-otp', { email, otp_code: otpCode });
};

export const login = (email, password) => {
  return api.post('/api/auth/login', { email, password });
};

// Document endpoints
export const uploadDocument = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/api/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getCollections = () => {
  return api.get('/api/documents/collections');
};

// Chat endpoints
export const askQuestion = (question, collectionId) => {
  return api.post('/api/chat/ask', {
    question,
    collection_id: collectionId,
  });
};

// Make api available globally
window.api = {
  register,
  verifyOTP,
  login,
  uploadDocument,
  getCollections,
  askQuestion
};

