const { useState } = React;
const { useNavigate, Link } = ReactRouterDOM;

function Register() {
  const [step, setStep] = useState(1); // 1: register, 2: verify OTP
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await window.api.register(email, password);
      setSuccess('Registration successful! Please check your email for the OTP code.');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await window.api.verifyOTP(email, otpCode);
      setSuccess('Account verified successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '3rem' }}>
      <div className="card">
        {step === 1 ? (
          <>
            <h1 className="card-title">Register</h1>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@gmail.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="At least 6 characters"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter your password"
                />
              </div>
              {error && (
                <div className="alert alert-error">{error}</div>
              )}
              {success && (
                <div className="alert alert-success">{success}</div>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </>
        ) : (
          <>
            <h1 className="card-title">Verify OTP</h1>
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
              We've sent an OTP code to <strong>{email}</strong>. Please enter it below to verify your account.
            </p>
            <form onSubmit={handleVerifyOTP}>
              <div className="form-group">
                <label className="form-label">OTP Code</label>
                <input
                  type="text"
                  className="form-input"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  required
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                />
              </div>
              {error && (
                <div className="alert alert-error">{error}</div>
              )}
              {success && (
                <div className="alert alert-success">{success}</div>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setStep(1)}
                style={{ background: 'transparent', border: 'none', color: '#3498db', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Back to registration
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}


