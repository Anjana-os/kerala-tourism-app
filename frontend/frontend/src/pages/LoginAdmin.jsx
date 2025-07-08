import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginAdmin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // ✅ Clean input
    const cleanData = {
      username: formData.username.trim(),
      password: formData.password.trim()
    };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(cleanData)
      });

      const result = await response.json();
      console.log('Login Result:', result);

      if (result.success && result.role === 'admin') {
        navigate('/admin');
      } else {
        setError(result.message || 'Invalid username or password');
        setFormData({ username: '', password: '' });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.loginBox}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#2b5d36' }}>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="admin-username">Username</label>
            <input
              type="text"
              id="admin-username"
              name="username"
              placeholder="Enter admin username"
              required
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="admin-password">Password</label>
            <input
              type="password"
              id="admin-password"
              name="password"
              placeholder="Enter password"
              required
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.loginBtn} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div style={styles.error}>{error}</div>}
        </form>
        <div style={styles.bottomText}>
          Not an admin? <Link to="/login">Customer Login</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: { margin: 0, fontFamily: 'Poppins, sans-serif', background: 'linear-gradient(135deg, #395c3f, #0a3a22)', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' },
  loginBox: { background: 'white', padding: '40px 30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px' },
  inputGroup: { marginBottom: '20px' },
  input: { width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '16px', transition: '0.3s ease' },
  loginBtn: { width: '100%', background: 'linear-gradient(to right, #3b7d31, #2c8f46)', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' },
  bottomText: { textAlign: 'center', marginTop: '20px', color: '#2f7a42' },
  error: { color: 'red', textAlign: 'center', marginTop: '10px' }
};

export default LoginAdmin;
