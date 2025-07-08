import React, { useEffect, useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';
const Kozhikode = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  // Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/kozhikode') // 👈 Ensure district is stored as 'kozhikode' in lowercase in DB
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
        <h1>Kozhikode - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <main className="place-gallery">

        {/* ✅ Hardcoded Tourist Places */}
        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nprvi-IFiiqwUPEG_aAUYPJi02bp25nS_FlZD4J6KD0WHDQvwGnIruRxvwUfdTF3n1wGCkWqID19gRu6ezi48mSLGwhgThnL4-vU3cBjTzlJtT455QsDSiAs866urzr-qHrKd9_=s220-w165-h220-n-k-no"
            alt="Kozhippara Waterfalls"
          />
          <div className="place-info">
            <h2>Kozhippara Waterfalls</h2>
            <p><strong>Address:</strong> 9435+G3Q, Kozhippara Rd, Kerala 679334</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqWNPOFaMFEWrdJWeKgPhYndoucA51146BDOjumsk7eUhlWF5lhoFEBnL-dWgkbhNe5VqOZvZuiFRwHOY9TPLb_4N4bDK-YGaql89UCC5miEzDFTrVCBKH3RIEnKZRH89YaZ41N=s294-w294-h220-n-k-no"
            alt="Kappad"
          />
          <div className="place-info">
            <h2>Kappad</h2>
            <p><strong>Address:</strong> Near Koyilandy, in the Kozhikode district, Kerala, India</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqPDKP6NT67tqATegUp3COc9FEGkl_lwSKE5Z7ovIFQFgTHa7jbCDJsM0BlC4sSzTFUnpAjY5slk1JrDlHQclba4fGuYE33nOwpIKs5KZnISPJeFAsB8SbUtF0zpM2Bp4MsuczbVA=s294-w294-h220-n-k-no"
            alt="Kariyathumpara"
          />
          <div className="place-info">
            <h2>Kariyathumpara</h2>
            <p><strong>Address:</strong> Kakkayam Rd, Kozhikode 673615, India</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4no2fNyWlCdIVdwMRlgN6i5nYU670NWREqpw8eRZcdQYl-PaOBm5xnsali_nWLFR066Sj2KsrJRbzPon15HTAwIloZ8IlFdX7T6KShV-98ZhzhHZHvSk_-gYtq_UdG9_AGyjhzZh=s294-w294-h220-n-k-no"
            alt="Kozhikode Beach"
          />
          <div className="place-info">
            <h2>Kozhikode Beach</h2>
            <p><strong>Address:</strong> Located on the western side of Kozhikode city in the state of Kerala, India</p>
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

export default Kozhikode;
