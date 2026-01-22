// Main application
const root = document.getElementById('root');

// Check authentication
function isAuthenticated() {
  return !!localStorage.getItem('token');
}

// Navbar component
function renderNavbar() {
  const auth = isAuthenticated();
  return `
    <nav class="navbar">
      <div class="container navbar-content">
        <a href="#/" class="navbar-brand">InfoBot</a>
        <div class="navbar-links">
          <a href="#/">Home</a>
          <a href="#/about">About</a>
          <a href="#/how-to-use">How to Use</a>
          <a href="#/api-doc">API Doc</a>
          ${auth ? `
            <a href="#/dashboard">Dashboard</a>
            <button class="navbar-button" onclick="handleLogout()">Logout</button>
          ` : `
            <a href="#/login" class="navbar-button">Login</a>
            <a href="#/register" class="navbar-button">Register</a>
          `}
        </div>
      </div>
    </nav>
  `;
}

// Layout wrapper
function renderLayout(content) {
  return `
    ${renderNavbar()}
    <main class="main-content">
      ${content}
    </main>
    <footer class="footer">
      <div class="container">
        <p>&copy; 2026 InfoBot. All rights reserved.</p>
      </div>
    </footer>
  `;
}

// Home page
function renderHome() {
  const content = `
    <div>
      <div class="hero">
        <div class="container">
          <h1>InfoBot</h1>
          <p>Transform your documents into intelligent Q&A systems</p>
          <div>
            <a href="#/register" class="btn btn-primary" style="margin-right: 1rem;">Get Started</a>
            <a href="#/about" class="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="features">
          <div class="feature-card">
            <h3>📄 Document Processing</h3>
            <p>Upload your PDF documents and let our AI process them into searchable knowledge bases.</p>
          </div>
          <div class="feature-card">
            <h3>🤖 Intelligent Q&A</h3>
            <p>Ask questions about your documents and get accurate, context-aware answers powered by RAG.</p>
          </div>
          <div class="feature-card">
            <h3>🔒 Secure & Private</h3>
            <p>Your documents are processed securely. Each user has their own isolated collections.</p>
          </div>
          <div class="feature-card">
            <h3>🚀 Easy Integration</h3>
            <p>Simple REST API for easy integration into your existing applications and workflows.</p>
          </div>
        </div>
        <div class="card" style="margin-top: 3rem;">
          <h2 class="card-title">Use Cases</h2>
          <ul style="line-height: 2; padding-left: 2rem;">
            <li>Companies can upload privacy policies and route user queries</li>
            <li>Legal document Q&A systems</li>
            <li>Technical documentation assistants</li>
            <li>Research paper analysis</li>
            <li>Customer support knowledge bases</li>
          </ul>
        </div>
      </div>
    </div>
  `;
  root.innerHTML = renderLayout(content);
}

// About page
function renderAbout() {
  const content = `
    <div class="container">
      <div class="card">
        <h1 class="card-title">About InfoBot</h1>
        <p style="margin-bottom: 1rem; line-height: 1.8;">
          InfoBot is a powerful platform that enables companies and individuals to transform
          their documents into intelligent question-answering systems using Retrieval Augmented Generation (RAG) technology.
        </p>
        <h2 style="margin-top: 2rem; margin-bottom: 1rem; color: #2c3e50;">What is RAG?</h2>
        <p style="margin-bottom: 1rem; line-height: 1.8;">
          Retrieval Augmented Generation (RAG) combines the power of information retrieval with large language models.
          Instead of relying solely on the model's training data, RAG retrieves relevant context from your documents
          and uses it to generate accurate, context-aware answers.
        </p>
        <h2 style="margin-top: 2rem; margin-bottom: 1rem; color: #2c3e50;">Use Case: Privacy Policy Q&A</h2>
        <p style="margin-bottom: 1rem; line-height: 1.8;">
          Companies can upload their privacy policies and other important documents to this service.
          When users have questions, they can be routed to this system, which will provide accurate answers
          based on the uploaded documents. This ensures consistent, reliable responses while reducing the burden
          on customer support teams.
        </p>
        <h2 style="margin-top: 2rem; margin-bottom: 1rem; color: #2c3e50;">Technology Stack</h2>
        <ul style="line-height: 2; padding-left: 2rem;">
          <li><strong>Backend:</strong> FastAPI (Python web framework)</li>
          <li><strong>Vector Database:</strong> ChromaDB for storing document embeddings</li>
          <li><strong>RAG Pipeline:</strong> LangChain for orchestration</li>
          <li><strong>LLM:</strong> Hugging Face Transformers (free models)</li>
          <li><strong>Frontend:</strong> Vanilla JavaScript</li>
          <li><strong>Authentication:</strong> JWT-based with OTP email verification</li>
        </ul>
      </div>
    </div>
  `;
  root.innerHTML = renderLayout(content);
}

// How to Use page
function renderHowToUse() {
  const content = `
    <div class="container">
      <div class="card">
        <h1 class="card-title">How to Use InfoBot</h1>
        <div style="margin-top: 2rem;">
          <h2 style="margin-bottom: 1rem; color: #2c3e50;">Step 1: Create an Account</h2>
          <p style="margin-bottom: 2rem; line-height: 1.8;">
            Click on the "Register" button in the navigation bar. Enter your email address (Gmail recommended)
            and create a secure password. After submitting, you'll receive an OTP code via email.
          </p>
          
          <h2 style="margin-bottom: 1rem; color: #2c3e50;">Step 2: Verify Your Email</h2>
          <p style="margin-bottom: 2rem; line-height: 1.8;">
            Check your email inbox for the OTP (One-Time Password) code. Enter this code in the verification
            form to activate your account. The OTP expires after 10 minutes.
          </p>
          
          <h2 style="margin-bottom: 1rem; color: #2c3e50;">Step 3: Login</h2>
          <p style="margin-bottom: 2rem; line-height: 1.8;">
            Once your account is verified, log in using your email and password. You'll be redirected to your dashboard.
          </p>
          
          <h2 style="margin-bottom: 1rem; color: #2c3e50;">Step 4: Upload a PDF Document</h2>
          <p style="margin-bottom: 2rem; line-height: 1.8;">
            In the dashboard, you'll see the document upload section. You can either drag and drop a PDF file
            or click to browse and select a PDF file from your computer.
          </p>
          
          <h2 style="margin-bottom: 1rem; color: #2c3e50;">Step 5: Ask Questions</h2>
          <p style="margin-bottom: 2rem; line-height: 1.8;">
            In the chatbot section of the dashboard, select the document collection you want to query (if you have multiple).
            Type your question in the input field and click "Send". The system will search for relevant chunks in your document,
            retrieve the most relevant context, and generate an answer.
          </p>
        </div>
      </div>
    </div>
  `;
  root.innerHTML = renderLayout(content);
}

// API Doc page
function renderApiDoc() {
  const content = `
    <div class="container">
      <div class="card">
        <h1 class="card-title">API Documentation</h1>
        <p style="margin-bottom: 2rem; line-height: 1.8;">
          This API provides endpoints for authentication, document management, and question-answering.
          All endpoints return JSON responses.
        </p>
        
        <h2 style="margin-top: 2rem; margin-bottom: 1rem; color: #2c3e50;">Base URL</h2>
        <code style="display: block; padding: 1rem; background: #f8f9fa; border-radius: 4px; margin-bottom: 2rem;">
          http://localhost:8000
        </code>
        
        <h2 style="margin-top: 2rem; margin-bottom: 1rem; color: #2c3e50;">Authentication</h2>
        <p style="margin-bottom: 1rem; line-height: 1.8;">
          Most endpoints require authentication. Include the JWT token in the Authorization header:
        </p>
        <code style="display: block; padding: 1rem; background: #f8f9fa; border-radius: 4px; margin-bottom: 2rem;">
          Authorization: Bearer &lt;token&gt;
        </code>
        
        <h2 style="margin-top: 2rem; margin-bottom: 1rem; color: #2c3e50;">Endpoints</h2>
        <p style="margin-bottom: 1rem;">See the full API documentation at <a href="http://localhost:8000/docs" target="_blank">http://localhost:8000/docs</a></p>
      </div>
    </div>
  `;
  root.innerHTML = renderLayout(content);
}

// Login page
function renderLogin() {
  const content = `
    <div class="container" style="max-width: 500px; margin-top: 3rem;">
      <div class="card">
        <h1 class="card-title">Login</h1>
        <form id="loginForm" onsubmit="handleLogin(event)">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="loginEmail" required placeholder="your.email@example.com" />
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="loginPassword" required placeholder="Enter your password" />
          </div>
          <div id="loginError" style="display: none;" class="alert alert-error"></div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
        </form>
        <p style="text-align: center; margin-top: 1rem;">
          Don't have an account? <a href="#/register">Register here</a>
        </p>
      </div>
    </div>
  `;
  root.innerHTML = renderLayout(content);
}

// Register page
function renderRegister() {
  const content = `
    <div class="container" style="max-width: 500px; margin-top: 3rem;">
      <div class="card">
        <h1 class="card-title">Register</h1>
        <form id="registerForm" onsubmit="handleRegister(event)">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="registerEmail" required placeholder="your.email@gmail.com" />
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="registerPassword" required placeholder="Enter your password" />
          </div>
          <div class="form-group">
            <label class="form-label">Confirm Password</label>
            <input type="password" class="form-input" id="registerConfirmPassword" required placeholder="Re-enter your password" />
          </div>
          <div id="registerError" style="display: none;" class="alert alert-error"></div>
          <div id="registerSuccess" style="display: none;" class="alert alert-success"></div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Register</button>
        </form>
        <p style="text-align: center; margin-top: 1rem;">
          Already have an account? <a href="#/login">Login here</a>
        </p>
      </div>
    </div>
  `;
  root.innerHTML = renderLayout(content);
}

// Dashboard page
let collections = [];
let selectedCollectionId = '';

async function renderDashboard() {
  if (!isAuthenticated()) {
    router.navigate('/login');
    return;
  }
  
  try {
    const result = await getCollections();
    if (result && result.data) {
      collections = result.data;
      if (collections.length > 0 && !selectedCollectionId) {
        selectedCollectionId = collections[0].id.toString();
      }
    }
  } catch (error) {
    console.error('Error loading collections:', error);
  }
  
  const content = `
    <div class="container">
      <h1 style="margin-bottom: 2rem; color: #2c3e50;">Dashboard</h1>
      <div class="dashboard">
        <div>
          <div class="card">
            <h2 class="card-title">Upload PDF Document</h2>
            <div class="upload-area" id="uploadArea" ondrop="handleDrop(event)" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)">
              <input type="file" accept=".pdf" id="fileInput" style="display: none;" onchange="handleFileSelect(event)" />
              <label for="fileInput" style="cursor: pointer; width: 100%; display: block;">
                <div id="uploadText">
                  <p>Drag and drop a PDF file here, or click to select</p>
                  <p style="font-size: 0.9rem; color: #7f8c8d;">Only PDF files are supported</p>
                </div>
              </label>
            </div>
            <div id="uploadMessage" style="display: none;" class="alert"></div>
            <button id="uploadBtn" class="btn btn-primary" onclick="handleUpload()" style="width: 100%; margin-top: 1rem; display: none;">Upload Document</button>
          </div>
          <div class="card">
            <h2 class="card-title">Your Documents</h2>
            ${collections.length === 0 ? '<p>No documents uploaded yet. Upload your first PDF to get started!</p>' : `
              <ul class="collections-list">
                ${collections.map(col => `
                  <li class="collection-item">
                    <div>
                      <strong>${col.document_name}</strong><br/>
                      <small style="color: #7f8c8d;">Collection: ${col.collection_name}</small><br/>
                      <small style="color: #7f8c8d;">Uploaded: ${new Date(col.created_at).toLocaleDateString()}</small>
                    </div>
                  </li>
                `).join('')}
              </ul>
              ${collections.length > 1 ? `
                <div class="form-group" style="margin-top: 1rem;">
                  <label class="form-label">Select Document for Chat</label>
                  <select class="form-input" id="collectionSelect" onchange="selectedCollectionId = this.value">
                    ${collections.map(col => `
                      <option value="${col.id}" ${col.id.toString() === selectedCollectionId ? 'selected' : ''}>${col.document_name}</option>
                    `).join('')}
                  </select>
                </div>
              ` : ''}
            `}
          </div>
        </div>
        <div>
          <div class="card">
            <h2 class="card-title">Chat with your Document</h2>
            ${collections.length === 0 ? '<p>Please upload a document first to start chatting.</p>' : `
              <div class="chat-container">
                <div class="chat-messages" id="chatMessages">
                  <p style="text-align: center; color: #7f8c8d;">Start asking questions about your document...</p>
                </div>
                <div class="chat-input-container">
                  <input type="text" class="chat-input" id="chatInput" placeholder="Ask a question..." onkeypress="if(event.key==='Enter') handleChatSend()" />
                  <button class="chat-send-btn" onclick="handleChatSend()">Send</button>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
  root.innerHTML = renderLayout(content);
  
  if (collections.length > 0) {
    selectedCollectionId = document.getElementById('collectionSelect')?.value || collections[0].id.toString();
  }
}

// Event handlers
let selectedFile = null;

function handleDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type === 'application/pdf') {
    selectedFile = file;
    document.getElementById('uploadText').innerHTML = `
      <p>Selected: ${file.name}</p>
      <p style="font-size: 0.9rem; color: #7f8c8d;">Click to change file</p>
    `;
    document.getElementById('uploadBtn').style.display = 'block';
  } else {
    showUploadMessage('Please upload a PDF file', 'error');
  }
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) {
    if (file.type === 'application/pdf') {
      selectedFile = file;
      document.getElementById('uploadText').innerHTML = `
        <p>Selected: ${file.name}</p>
        <p style="font-size: 0.9rem; color: #7f8c8d;">Click to change file</p>
      `;
      document.getElementById('uploadBtn').style.display = 'block';
      showUploadMessage('', '');
    } else {
      showUploadMessage('Please select a PDF file', 'error');
      selectedFile = null;
    }
  }
}

function showUploadMessage(message, type) {
  const msgEl = document.getElementById('uploadMessage');
  if (message) {
    msgEl.style.display = 'block';
    msgEl.className = `alert alert-${type}`;
    msgEl.textContent = message;
  } else {
    msgEl.style.display = 'none';
  }
}

async function handleUpload() {
  if (!selectedFile) {
    showUploadMessage('Please select a file', 'error');
    return;
  }
  
  showUploadMessage('Uploading...', 'info');
  document.getElementById('uploadBtn').disabled = true;
  
  try {
    const result = await uploadDocument(selectedFile);
    if (result) {
      showUploadMessage(`Document uploaded successfully! Collection: ${result.collection_name}`, 'success');
      selectedFile = null;
      document.getElementById('uploadBtn').style.display = 'none';
      document.getElementById('uploadText').innerHTML = `
        <p>Drag and drop a PDF file here, or click to select</p>
        <p style="font-size: 0.9rem; color: #7f8c8d;">Only PDF files are supported</p>
      `;
      setTimeout(() => renderDashboard(), 1000);
    }
  } catch (error) {
    showUploadMessage(error.response?.data?.detail || 'Error uploading document', 'error');
  } finally {
    document.getElementById('uploadBtn').disabled = false;
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const errorEl = document.getElementById('loginError');
  
  try {
    const result = await login(email, password);
    if (result && result.data) {
      router.navigate('/dashboard');
    } else {
      errorEl.style.display = 'block';
      errorEl.textContent = 'Login failed. Please try again.';
    }
  } catch (error) {
    errorEl.style.display = 'block';
    errorEl.textContent = error.message || 'Login failed. Please try again.';
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  const errorEl = document.getElementById('registerError');
  const successEl = document.getElementById('registerSuccess');
  
  if (password !== confirmPassword) {
    errorEl.style.display = 'block';
    errorEl.textContent = 'Passwords do not match';
    return;
  }
  
  try {
    const result = await register(email, password);
    if (result && result.data) {
      successEl.style.display = 'block';
      successEl.textContent = 'Registration successful! Redirecting to login...';
      setTimeout(() => {
        router.navigate('/login');
      }, 2000);
    }
  } catch (error) {
    errorEl.style.display = 'block';
    errorEl.textContent = error.message || 'Registration failed. Please try again.';
  }
}

function handleLogout() {
  localStorage.removeItem('token');
  router.navigate('/login');
}

let chatMessages = [];

function addChatMessage(role, content) {
  chatMessages.push({ role, content });
  renderChatMessages();
}

function renderChatMessages() {
  const messagesEl = document.getElementById('chatMessages');
  if (chatMessages.length === 0) {
    messagesEl.innerHTML = '<p style="text-align: center; color: #7f8c8d;">Start asking questions about your document...</p>';
    return;
  }
  
  messagesEl.innerHTML = chatMessages.map(msg => `
    <div class="message ${msg.role}">${msg.content}</div>
  `).join('');
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function handleChatSend() {
  if (!selectedCollectionId || collections.length === 0) {
    alert('Please upload a document first');
    return;
  }
  
  const input = document.getElementById('chatInput');
  const question = input.value.trim();
  if (!question) return;
  
  addChatMessage('user', question);
  input.value = '';
  input.disabled = true;
  
  // Add loading message
  const loadingId = chatMessages.length;
  chatMessages.push({ role: 'assistant', content: 'Thinking...', loading: true });
  renderChatMessages();
  
  try {
    const result = await askQuestion(question, selectedCollectionId);
    if (result && result.data) {
      chatMessages[loadingId] = { role: 'assistant', content: result.data.answer };
    } else {
      chatMessages[loadingId] = { role: 'assistant', content: 'Error: Could not get answer' };
    }
  } catch (error) {
    chatMessages[loadingId] = { role: 'assistant', content: `Error: ${error.message || 'Failed to get answer'}` };
  } finally {
    renderChatMessages();
    input.disabled = false;
    input.focus();
  }
}

// Set up routes
router.addRoute('/', renderHome);
router.addRoute('/about', renderAbout);
router.addRoute('/how-to-use', renderHowToUse);
router.addRoute('/api-doc', renderApiDoc);
router.addRoute('/login', renderLogin);
router.addRoute('/register', renderRegister);
router.addRoute('/dashboard', renderDashboard);

// Make functions global for inline handlers
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleLogout = handleLogout;
window.handleDrop = handleDrop;
window.handleDragOver = handleDragOver;
window.handleDragLeave = handleDragLeave;
window.handleFileSelect = handleFileSelect;
window.handleUpload = handleUpload;
window.handleChatSend = handleChatSend;
window.renderRegister = renderRegister;

