import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CustomerSignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });

      if (response.status === 200) {
        setIsSuccess(true);
        setMessage('✅ Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); // Redirect after success
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsSuccess(false);
        setMessage('❌ Username already exists. Please try another one.');
      } else {
        setIsSuccess(false);
        setMessage('❌ Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.formContainer}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        {message && (
          <div style={isSuccess ? styles.successMessage : styles.errorMessage}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: 'Poppins, sans-serif',
    background: 'linear-gradient(135deg, #21463f, #0f9576)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  formContainer: {
    background: '#ffffff',
    padding: '40px 30px',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(24, 94, 68, 0.1)',
    width: '350px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '12px',
    marginTop: '20px',
    backgroundColor: '#22b17d',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default CustomerSignUp;
