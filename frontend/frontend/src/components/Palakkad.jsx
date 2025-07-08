import React, { useEffect, useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';
const Palakkad = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  // Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/palakkad') // 👈 Make sure district name is stored as 'palakkad' in the database
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
        <h1>Palakkad - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>
      <main className="place-gallery">

        {/* ✅ Hardcoded Tourist Places */}
        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrfeP01mPfj8IhwL02-mJn-hL_PW63_coa_8HqM9RTL9VX3F6UyJh77b3iPE4mc7X6MHNkiG4j8DCvwbgQ7qjz0XlBvM7gULTPQFkYPJBECHD3_NX5POYJmydc_2WglyCQ2_MN8=s1360-w1360-h1020-rw"
            alt="Silent Valley National Park"
          />
          <div className="place-info">
            <h2>Silent Valley National Park</h2>
            <p><strong>Address:</strong> It's situated in the Nilgiri Hills, Palakkad, Kerala, 678582</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/89/e3/1c/keshavapara-nelliyampathy.jpg?w=1400&h=-1&s=1"
            alt="Nelliyampathi"
          />
          <div className="place-info">
            <h2>Nelliyampathi</h2>
            <p><strong>Address:</strong> 60 kilometres (37 mi) from Palakkad, Kerala, 678508</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/3a/d3/ce/20201024-110128-largejpg.jpg?w=1400&h=800&s=1"
            alt="Pothundi Dam"
          />
          <div className="place-info">
            <h2>Pothundi Dam</h2>
            <p><strong>Address:</strong> Near the town of Nenmara, about 35 km from Palakkad town, Kerala, 678508</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Kollemkode_palace%2C_Chembookkavu%2C_Thrissur%2C_Kerala%2C_India_IMG_20191109_173239.jpg"
            alt="Kollengode Palace"
          />
          <div className="place-info">
            <h2>Kollengode Palace</h2>
            <p><strong>Address:</strong> Located in the town of Kollengode, Palakkad, Kerala, 678506</p>
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

export default Palakkad;
