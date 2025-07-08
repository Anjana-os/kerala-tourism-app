import React, { useEffect, useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';
const Pathanamthitta = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  // Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/pathanamthitta') // 👈 The district name must be 'pathanamthitta' in the database
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
        <h1>Pathanamthitta - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <main className="place-gallery">

        {/* ✅ Hardcoded Tourist Places */}
        <div className="place-card">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/c0/25/00/photo8jpg.jpg?w=1400&h=800&s=1"
            alt="Sabarimala Sri Dharmasastha Temple"
          />
          <div className="place-info">
            <h2>Sabarimala Sri Dharmasastha Temple</h2>
            <p><strong>Address:</strong> Sabarimala, Pathanamthitta, Kerala - 689713</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Gavi%2C_Kerala.jpg/500px-Gavi%2C_Kerala.jpg"
            alt="Gavi"
          />
          <div className="place-info">
            <h2>Gavi</h2>
            <p><strong>Address:</strong> Gavi, Kerala, Pathanamthitta, 685533</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://www.dtpcpathanamthitta.com/uploads/picture_gallery/gallery_images/parathodu-meenmuttippara-waterfalls-pathanamthitta-4-20230508135747474034.webp"
            alt="Parathodu Meenmuttypara Waterfalls"
          />
          <div className="place-info">
            <h2>Parathodu Meenmuttypara Waterfalls</h2>
            <p><strong>Address:</strong> CMFM+XVG, Mallappally, Kerala 689587</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://www.dtpcpathanamthitta.com/uploads/picture_gallery/gallery_images/adavi-ecotourism-centre-pathanamthitta-8-20230508114959992569.webp"
            alt="Adavi Eco Tourism"
          />
          <div className="place-info">
            <h2>Adavi Eco Tourism</h2>
            <p><strong>Address:</strong> 6WWC+2X2, Konni - Thannithodu Road, Thannithodu, Kerala 689699</p>
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

export default Pathanamthitta;
