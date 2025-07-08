import React, { useEffect, useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom'; // ✅ Navigation after logout
const Idukki = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
  // ✅ Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/idukki')
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
        <h1>Idukki - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <main className="place-gallery">
        {/* ✅ Static Places */}
        <div className="place-card">
          <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/17/28/ed/iduukki-arch-dam.jpg?w=700&h=500&s=1" alt="Idukki Dam" />
          <div className="place-info">
            <h2>Idukki Dam</h2>
            <p><strong>Address:</strong> Cheruthony, Idukki Twp, Kerala 685602</p>
          </div>
        </div>

        <div className="place-card">
          <img src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nowPYkmC7_PX1JVmw9mdsP_aFVP0mTD-1bajzKLOJhnJQCITwKm3peV-E3b_pqgdXpLetavOMUbtARhHo8M_5TQKCnX1xRtFLYeqLDX76rnoGHZrmFfXlIB97no6xyCW9NYdCE=s1360-w1360-h1020-rw" alt="Hill View Park" />
          <div className="place-info">
            <h2>Hill View Park</h2>
            <p><strong>Address:</strong> Hill View, Near Highway, Cheruthoni Road, Cheruthoni-685602</p>
          </div>
        </div>

        <div className="place-card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdxN5hh1xk-CycIavqhw_Ck4uzXJmIZq-N_CYrEDxQjC2-I4&s" alt="Periyar National Park" />
          <div className="place-info">
            <h2>Periyar National Park</h2>
            <p><strong>Address:</strong> Periyar National Park, Kumily Thekkady, Peerumade, Idukki District, Kerala, 685536</p>
          </div>
        </div>

        <div className="place-card">
          <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/72/f1/7e/img-20190207-wa0022-largejpg.jpg?w=1400&h=800&s=1" alt="Meesapulimala" />
          <div className="place-info">
            <h2>Meesapulimala</h2>
            <p><strong>Address:</strong> Meesapulimala, Kannan Devan Hills, Idukki, Kerala, 685616</p>
          </div>
        </div>

        {/* ✅ Admin-Added Places */}
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

export default Idukki;
