import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Import Link
import axios from 'axios';

function Login() {
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

    try {
      const response = await axios.post('http://localhost:5000/login', formData, { withCredentials: true });

      if (response.data.success) {
        if (response.data.role === 'user') {
          navigate('/choose'); // ✅ Redirect to customer page
        } else if (response.data.role === 'admin') {
          navigate('/admin'); // ✅ Redirect to admin page
        }
      } else {
        setError(response.data.message || '❌ Invalid credentials.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Customer Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              required
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={{ ...styles.loginBtn, ...(loading ? styles.disabledBtn : {}) }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div style={styles.error}>{error}</div>}
        </form>
        <div style={styles.bottomText}>
          Admin? <Link to="/loginadmin">Login here</Link> {/* ✅ Correct routing */}
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    margin: 0,
    fontFamily: 'Poppins, sans-serif',
    background: 'linear-gradient(135deg, #395c3f, #0a3a22)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  loginBox: {
    background: 'white',
    padding: '40px 30px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#2b5d36'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '10px',
    fontSize: '16px',
    transition: '0.3s ease'
  },
  loginBtn: {
    width: '100%',
    background: 'linear-gradient(to right, #3b7d31, #2c8f46)',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  disabledBtn: {
    opacity: 0.7,
    cursor: 'not-allowed'
  },
  bottomText: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#2f7a42'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px'
  }
};

export default Login;
