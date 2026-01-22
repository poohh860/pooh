const { useState, useEffect, useRef } = React;

function Chatbot({ collectionId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !collectionId || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await window.api.askQuestion(input, collectionId);
      const assistantMessage = {
        role: 'assistant',
        content: response.data.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: `Error: ${error.response?.data?.detail || error.message}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!collectionId) {
    return (
      <div className="card">
        <p>Please upload a document first to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">Chat with your Document</h2>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
              Start asking questions about your document...
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))
          )}
          {loading && (
            <div className="message assistant">
              <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            disabled={loading}
          />
          <button
            className="chat-send-btn"
            onClick={handleSend}
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}


