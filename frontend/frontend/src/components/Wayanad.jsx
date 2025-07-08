import React, { useEffect, useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';
const Wayanad = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  // Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/wayanad') // 👈 Make sure district is 'wayanad' in backend
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
        <h1>Wayanad - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>
      <main className="place-gallery">

        {/* ✅ Hardcoded Tourist Places */}
        <div className="place-card">
          <img
            src="https://c8.alamy.com/comp/2RRR2DA/thusharagiri-falls-is-a-waterfall-located-in-kozhikode-district-in-the-indian-state-of-kerala-india-23-september-2023-2RRR2DA.jpg"
            alt="Thusharagiri Waterfalls"
          />
          <div className="place-info">
            <h2>Thusharagiri Waterfalls</h2>
            <p><strong>Address:</strong> Western ghats mountain range, Wayanad, Kerala 673586</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Wayanad_Wild_Life_Sanctuary.JPG/500px-Wayanad_Wild_Life_Sanctuary.JPG"
            alt="Wildlife Sanctuary"
          />
          <div className="place-info">
            <h2>Wildlife Sanctuary</h2>
            <p><strong>Address:</strong> Bathery-puthupally, Wayanad, Kerala 673592</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrBpCrXoibB5jOgtpUHGHPeCjx_uPex-3FdMQbbBONG8mofcDvRAOL--TKclYpDeZqvBTUYk6PTlyuNGbbRi5FrUqUhFmnrP7fg7x1KvuQWyR9p59tWZylD9bqYynXGDYFYWyQZ=w270-h312-n-k-no"
            alt="Edakkal Caves"
          />
          <div className="place-info">
            <h2>Edakkal Caves</h2>
            <p><strong>Address:</strong> Approximately 10Km from Sulthan Bathery, Wayanad, Kerala 673593</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcS1oAFTwB_7kIiSF094zdqRya9dkF8QnWjbGklOXpuJciNMy3RS3wCErkC3gR_WrAPdQ6A1igHOY2d96asZTBuiCmKQ0fa3nGilIBAADg"
            alt="Chembra Peak"
          />
          <div className="place-info">
            <h2>Chembra Peak</h2>
            <p><strong>Address:</strong> 8Km from Meppadi, Wayanad, Kerala, 673577</p>
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

export default Wayanad;
