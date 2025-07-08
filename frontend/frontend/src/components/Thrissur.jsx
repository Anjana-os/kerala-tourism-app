import React, { useEffect, useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';
const Thrissur = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  // Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/thrissur') // Make sure the district name is 'thrissur' in backend
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
        <h1>Thrissur - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <main className="place-gallery">

        {/* ✅ Hardcoded Tourist Places */}
        <div className="place-card">
          <img
            src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRGmsR9-2W3RS9HOE6SG0-kTHo_501A8LyVq6I_v63uTA1vkm61sPDrOtDbPP1V1cN7m0FghiidP91V8JZ_fEnPSjGRfrz2EzpVMZ06eQ"
            alt="Athirappilly waterfalls"
          />
          <div className="place-info">
            <h2>Athirappilly Waterfalls</h2>
            <p><strong>Address:</strong> Athirappilly panchayat, Chalakudy Taluk, Thrissur District, Kerala, 680721</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZq0jbg2WRvNXiLKBaTatYzxWd4hWyvGX6ceYTtLK7iMT6xF15VtJFRA5f7Q8i_3zkukg&usqp=CAU"
            alt="Snehatheeram Beach"
          />
          <div className="place-info">
            <h2>Snehatheeram Beach</h2>
            <p><strong>Address:</strong> Thambankadavu Beach Road, Thalikulam, Thrissur, Kerala, 680566</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://www.dtpcthrissur.com/uploads/picture_gallery/gallery_images/peechi-dam5-20230426163634766342.webp"
            alt="Peechi Dam"
          />
          <div className="place-info">
            <h2>Peechi Dam</h2>
            <p><strong>Address:</strong> Peechi, Thrissur District, Kerala, 680653</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqPCU6yEtRpuMe8vOG5tuGDbnFUg2b6BH1JlYopDEauDfMKftalwMR0TiJT9A3Rw2MDrV48Xrtn3PZpi_3SDLHUz2E3Wt19D84yJJeKAM8eNMDNjH4mqxX-4tC3JSL4owI7X-D6=s1360-w1360-h1020-rw"
            alt="Vadakkumnathan Temple"
          />
          <div className="place-info">
            <h2>Vadakkumnathan Temple</h2>
            <p><strong>Address:</strong> Swaraj Round N, Thekkinkadu Maidan, Thrissur, Kerala, India, 680001</p>
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

export default Thrissur;
