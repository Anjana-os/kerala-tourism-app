import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChoosePage() {
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/get-role")
      .then(res => res.json())
      .then(data => {
        setRole(data.role);
      });
  }, []);

  const districts = [
    { name: "Thiruvananthapuram", path: "trivandrum" },
    { name: "Kollam", path: "kollam" },
    { name: "Pathanamthitta", path: "pathanamthitta" },
    { name: "Alappuzha", path: "alappuzha" },
    { name: "Kottayam", path: "kottayam" },
    { name: "Idukki", path: "idukki" },
    { name: "Ernakulam", path: "ernakulam" },
    { name: "Thrissur", path: "thrissur" },
    { name: "Palakkad", path: "palakkad" },
    { name: "Malappuram", path: "Malappuram" },
    { name: "Kozhikode", path: "Kozhikode" },
    { name: "Wayanad", path: "Wayanad" },
    { name: "Kannur", path: "Kannur" },
    { name: "Kasaragod", path: "Kasaragod" },
  ];

  const handleButtonClick = (path) => {
    window.location.href = `/components/${path}.html`; // If you plan to keep old HTML files
    // OR navigate(`/district/${path}`); // If you convert the district pages to React
  };

  return (
    <div>
      <header>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Choose the place you like to visit</h1>
      </header>

      <main style={mainStyle}>
        {districts.map((district, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(district.path)}
            style={buttonStyle}
          >
            {district.name}
          </button>
        ))}
      </main>

      {role === "admin" && (
        <button
          onClick={() => navigate('/admin')}
          style={adminButtonStyle}
        >
          ➕ Add Place
        </button>
      )}
    </div>
  );
}

const mainStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '15px',
  padding: '30px',
  maxWidth: '900px',
  margin: 'auto'
};

const buttonStyle = {
  padding: '15px',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#007e5a',
  color: 'white',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.2s'
};

const adminButtonStyle = {
  padding: '12px',
  backgroundColor: 'darkred',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  position: 'fixed',
  bottom: '20px',
  right: '20px'
};

export default ChoosePage;
