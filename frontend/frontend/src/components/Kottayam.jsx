import React, { useEffect, useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';
const Kottayam = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  // Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/kottayam') // 👈 Ensure district is stored as 'kottayam' in lowercase in DB
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
        <h1>Kottayam - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <main className="place-gallery">

        {/* ✅ Hardcoded Tourist Places */}
        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/p/AF1QipM_MYvkH9d0PAWgWTdtKH3EYqCfRhFR7LaWDyV5=s294-w294-h220-n-k-no"
            alt="Kattikkayam Waterfalls"
          />
          <div className="place-info">
            <h2>Kattikkayam Waterfalls</h2>
            <p><strong>Address:</strong> Pazhukkakanam Rd, Poonjar Vadakkekara, Kerala 686652</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/p/AF1QipOzk4vrvEsatcQpGt8gbkcZp8ED8CKc9ETN_MkC=s294-w294-h220-n-k-no"
            alt="Illikkal Kallu"
          />
          <div className="place-info">
            <h2>Illikkal Kallu</h2>
            <p><strong>Address:</strong> Illikkal Kallu Rd, Moonnilavu, Poonjar Vadakkekara, Kerala 686586</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gpms-cs-s/AB8u6HZZXDRrfRyyfH4ah0pGTcSdt6QDNa7R0kwE9YhtmHpU1BVufnTiw87du4M-SvnXJeqT6DaZXpKr94Ui-aqjoQKaxxYEomBkp1LiFt_RvXsGCohQRzSM_EFavUJJm8EE8t9g-zBQ=s294-w294-h220-n-k-no"
            alt="Mango Meadows Agricultural Theme Park"
          />
          <div className="place-info">
            <h2>Mango Meadows Agricultural Theme Park</h2>
            <p><strong>Address:</strong> P.O, Ayamkudy-Kaduthuruthy Road, BUILDING NO. XV/175 A, AYAMKUDI, Kaduthuruthy, Kerala 686613</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4noUv-haqkTZQ6CItwMiSm2GrIvNGzw80cJqNMC0egHOyVZNlQclURbXTUBxCR3mfLKuq9L0dI7DGw2OF_C4eSAceTXkazJDSUMFdTfGv5TmthVC2eqLqSg9kGs6a7R7v8FQJVtc=s1360-w1360-h1020-rw"
            alt="Ilaveezhapoonchira"
          />
          <div className="place-info">
            <h2>Ilaveezhapoonchira</h2>
            <p><strong>Address:</strong> Melukavu village in Kottayam district near Kanjar</p>
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

export default Kottayam;
