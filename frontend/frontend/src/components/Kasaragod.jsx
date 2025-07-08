import React, { useEffect, useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';
const Kasaragod = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  // Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/kasaragod') // 👈 Ensure district is stored as 'kasaragod' in lowercase in DB
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
        <h1>Kasaragod - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <main className="place-gallery">
        {/* ✅ Hardcoded Tourist Places */}
        <div className="place-card">
          <img
            src="https://www.keralatourism.org/_next/image/?url=http%3A%2F%2F127.0.0.1%2Fktadmin%2Fimg%2Fpages%2Fvertical%2Fkollam-beach-1727247765_a379e3366f46254d6007.webp&w=3840&q=75"
            alt="Nellikunnu Beach"
          />
          <div className="place-info">
            <h2>Nellikunnu Beach</h2>
            <p><strong>Address:</strong> 2km from Nellukunnu Kasaragod Town, Kasaragod, Kerala 671121</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://www.keralatourism.org/kasaragod/investment/images/top-attraction/large/valiyaparamba.jpg"
            alt="Valiyaparamba Backwater"
          />
          <div className="place-info">
            <h2>Valiyaparamba Backwater</h2>
            <p><strong>Address:</strong> 10km south of Nileswaram, Kasaragod, Kerala 671572</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://static.toiimg.com/photo/53095543.cms"
            alt="Bekal Fort"
          />
          <div className="place-info">
            <h2>Bekal Fort</h2>
            <p><strong>Address:</strong> Beside Bekal Fort Railway Station, Kasaragod, Kerala 671316</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://cdn.tripuntold.com/media/photos/location/2020/08/29/9ff3cd45-0e1a-4905-820d-f7f5c409660a.jpg"
            alt="Kottancheri Hills"
          />
          <div className="place-info">
            <h2>Kottancheri Hills</h2>
            <p><strong>Address:</strong> Close to Brahmagiri Hills, Kasaragod, Kerala, 671315</p>
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

export default Kasaragod;
