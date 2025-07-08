import React, { useEffect, useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';
const Thiruvananthapuram = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  // Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/trivandrum')
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
        <h1>Thiruvananthapuram - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <main className="place-gallery">

        {/* ✅ Hardcoded Tourist Places (Kept as it is) */}
        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4npv-hWpT1HpVMVzx_SXbgNfIbOfIjMLi15dBqRqTt751iL9Ye9I8E_eB785AE79y4J2pOp__MZX3j0EpDQMWmplzDESYh1Q4p_z1ymRry1RMmshOuA7qyH1m_pc9jLZoOznPsba=s1360-w1360-h1020-rw"
            alt="Sree Padmanabhaswamy Temple"
          />
          <div className="place-info">
            <h2>Sree Padmanabhaswamy Temple</h2>
            <p><strong>Address:</strong> West Nada, Fort, East Fort, Pazhavangadi, Thiruvananthapuram, Kerala 695023</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQWQyn_tPwY9-gCNdYWzzUX00V1TvBmkIN2i3xirb-Wy52pNaSGsJslrvUVb9hXN01ynM82mIqAVE7KMtwlmCJbo4HI6c4g"
            alt="Kovalam Beach Trivandrum"
          />
          <div className="place-info">
            <h2>Kovalam Beach Trivandrum</h2>
            <p><strong>Address:</strong> 9XQG+8FR, Light House Beach Rd, Kovalam, Thiruvananthapuram, Kerala 695527</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq942YYkTzHcKstHxFpqHAsonSBAzBxA4MZ-Lw6_eLBlZ1BPzcmJ44GJVI8IFONjUXMH8UyV3yJRrSHgUJq1GppUz26-eFRoBohhWT4XCSSALgxJx9157ZebWsmVfVVXdfpIL1MUg=s1360-w1360-h1020-rw"
            alt="Napier Museum"
          />
          <div className="place-info">
            <h2>Napier Museum</h2>
            <p><strong>Address:</strong> Museum Road, Viceregal Bungalow, Thiruvananthapuram, Kerala, 695004</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2023/12/15/2fdbfbaa7a71e0066a8596736e03caa8_1000x1000.jpg"
            alt="Kanakakunnu Palace"
          />
          <div className="place-info">
            <h2>Kanakakunnu Palace</h2>
            <p><strong>Address:</strong> Jawahar Nagar, Kowdiar, Thiruvananthapuram, Kerala, 695003</p>
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

export default Thiruvananthapuram;
