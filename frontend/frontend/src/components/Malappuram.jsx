import React, { useEffect, useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';
const Malappuram = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  // Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/malappuram') // 👈 Make sure the district name is stored as 'malappuram' in the database
      .then(response => response.json())
      .then(data => {
        setPlaces(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        setLoading(false);
      });
  }, []);
   // ✅ Logout Handler
  const handleLogout = () => {
    // Clear local storage or any auth token here
    localStorage.clear(); // or sessionStorage.clear()
    navigate('/'); // Redirect to login or home page
  };

  return (
    <div className="district-bg">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Malappuram - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <main className="place-gallery">

        {/* ✅ Hardcoded Tourist Places */}
        <div className="place-card">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/d3/5a/90/kumaragiri-farm-nature.jpg?w=1400&h=800&s=1"
            alt="Kumaragiri Farm & Nature Camp"
          />
          <div className="place-info">
            <h2>Kumaragiri Farm & Nature Camp</h2>
            <p><strong>Address:</strong> Kumaragiri Estates, Kumaragiri Estate Road, Koottil, Mankada, Perinthalmanna, Malappuram District, Kerala, 679324</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/10/4b/77/entrance-of-the-temple.jpg?w=1400&h=-1&s=1"
            alt="Kadampuzha Bhagavathy Temple"
          />
          <div className="place-info">
            <h2>Kadampuzha Bhagavathy Temple</h2>
            <p><strong>Address:</strong> Melmuri, Kadampuzha, Kerala 676553</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/41/2b/2d/snset-from-padinjarekkara.jpg?w=1400&h=-1&s=1"
            alt="Padinharekara Beach"
          />
          <div className="place-info">
            <h2>Padinharekara Beach</h2>
            <p><strong>Address:</strong> Tipu Sultan Road in Tirur, Malappuram district, 676562</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/b1/54/65/teak-museum-nilambur.jpg?w=800&h=-1&s=1"
            alt="Nilambur Teak Museum"
          />
          <div className="place-info">
            <h2>Nilambur Teak Museum</h2>
            <p><strong>Address:</strong> 8722+25V, SH28, Nilambur, Kerala 679330</p>
          </div>
        </div>

        {/* ✅ Admin Added Places Section */}
        <h2 style={{ width: '100%', textAlign: 'center', marginTop: '40px' }}>Admin Added Places</h2>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading places...</p>
        ) : places.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No new places added yet.</p>
        ) : (
          places.map((place, index) => (
            <div className="place-card" key={index}>
              <img src={place.image} alt={place.name} />
              <div className="place-info">
                <h2>{place.name}</h2>
                <p><strong>Address:</strong> {place.address}</p>
              </div>
            </div>
          ))
        )}

      </main>
    </div>
  );
};

export default Malappuram;
