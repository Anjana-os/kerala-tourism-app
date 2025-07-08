import React, { useEffect, useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';
const Kannur = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  // Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/kannur') // 👈 Ensure 'kannur' is stored in lowercase in your database
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
        <h1>Kannur - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <main className="place-gallery">

        {/* ✅ Hardcoded Tourist Places */}
        <div className="place-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaWgzRr7SFxp2YBh98tHw3fmlyQTBgYjAi511xpfLvcrXTMVdKiFwfu91wrdnoK1UzWd4&usqp=CAU"
            alt="Ezhimala Beach"
          />
          <div className="place-info">
            <h2>Ezhimala Beach</h2>
            <p><strong>Address:</strong> near Payyanur, Kannur, Kerala, 670310</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://kannurairport.aero/kial/public/uploads/destination_img/3UZ5PQI9Eu0HxdVMbbOdkt6kOM1CGV.jpg"
            alt="St Angelo fort"
          />
          <div className="place-info">
            <h2>St Angelo fort</h2>
            <p><strong>Address:</strong> Near, Kannur Cantonment Area, Burnacherry, Kannur, Kerala, 670017</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://www.keralatourism.org/images/enchanting_kerala/large/kavvayi_backwaters_tangled_beauty20200114100412_685_1.jpg"
            alt="Kavvayi island"
          />
          <div className="place-info">
            <h2>Kavvayi island</h2>
            <p><strong>Address:</strong> near Payyanur in the Kannur, Kerala, 670307</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPnI29-TnO9Edy2mu-lnL0awXLDYiKY3qrag&s"
            alt="Arakkal Museum"
          />
          <div className="place-info">
            <h2>Arakkal Museum</h2>
            <p><strong>Address:</strong> Ayikkara Government Hospital Road Ayikkara, near District Hospital, Kannur, Kerala, 670013</p>
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

export default Kannur;
