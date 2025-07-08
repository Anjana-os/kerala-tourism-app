import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    district: '',
    name: '',
    address: '',
    image: ''
  });

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/check-session', {
          method: 'GET',
          credentials: 'include'
        });

        const result = await response.json();

        if (!result.success || result.role !== 'admin') {
          alert('Unauthorized. Please login as admin.');
          navigate('/loginadmin');
        }
      } catch (error) {
        console.error('Session check failed:', error);
        alert('Session expired. Please login again.');
        navigate('/loginadmin');
      }
    };

    const fetchPlaces = async () => {
      try {
        const response = await fetch('http://localhost:5000/all-places', {
          credentials: 'include'
        });
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    checkSession();
    fetchPlaces();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/add-place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        setFormData({ district: '', name: '', address: '', image: '' });
        setPlaces(prev => [...prev, formData]);
        navigate(`/district/${formData.district.toLowerCase()}`);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error adding place:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this place?')) return;

    try {
      const response = await fetch(`http://localhost:5000/delete-place/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const result = await response.json();
      if (result.success) {
        alert(result.message);
        setPlaces(places.filter(place => place._id !== id));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include'
      });

      const result = await response.json();

      if (result.success) {
        alert('Logged out successfully.');
        navigate('/');
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error during logout.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f0f9f0', padding: '40px', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#2d7030' }}>Admin Panel - Add Tourist Place</h1>

      <div style={{ background: '#fff', padding: '20px', maxWidth: '500px', margin: '0 auto', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="district">Select District:</label>
          <select
            name="district"
            id="district"
            required
            value={formData.district}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">--Choose District--</option>
            <option value="trivandrum">Thiruvananthapuram</option>
            <option value="kollam">Kollam</option>
            <option value="pathanamthitta">Pathanamthitta</option>
            <option value="alappuzha">Alappuzha</option>
            <option value="kottayam">Kottayam</option>
            <option value="idukki">Idukki</option>
            <option value="ernakulam">Ernakulam</option>
            <option value="thrissur">Thrissur</option>
            <option value="palakkad">Palakkad</option>
            <option value="malappuram">Malappuram</option>
            <option value="kozhikode">Kozhikode</option>
            <option value="wayanad">Wayanad</option>
            <option value="kannur">Kannur</option>
            <option value="kasaragod">Kasaragod</option>
          </select>

          <input
            type="text"
            name="name"
            placeholder="Place Name"
            required
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            required
            value={formData.image}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={{ padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
            ➕ Add Place
          </button>
        </form>

        <button onClick={handleLogout} style={{ marginTop: '15px', padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
          🚪 Logout
        </button>
      </div>

      <div style={{ maxWidth: '800px', margin: '30px auto' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>🗑 Manage Added Places</h2>
        {places.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No places to display.</p>
        ) : (
          places.map((place) => (
            <div key={place._id} style={{ background: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '10px' }}>
              <p><strong>{place.name}</strong> - {place.district}</p>
              <p>{place.address}</p>
              <button onClick={() => handleDelete(place._id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', padding: '8px 16px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '8px'
};

export default AdminPage;
