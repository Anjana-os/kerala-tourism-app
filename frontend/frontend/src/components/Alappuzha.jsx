import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const Alappuzha = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // ✅ Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/alappuzha')
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
const handleLogout = () => {
    // Clear local storage or any auth token here
    localStorage.clear(); // or sessionStorage.clear()
    navigate('/'); // Redirect to login or home page
  };
  return (
    <div className="district-bg">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Alappuzha - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <main className="place-gallery">

        {/* ✅ Static Places */}
        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqeslhaM6NW2Rs-j-rU7Nfq9BNuXb6wYxqM-0EzL0A2fq6BafzufCHEePghS3Audazj0nfZ0q9RRaCsLZ4Hc4mdrJnZHIEccB18idADJiTcAIo48oT1D8EX4N-SWd8vK85hHI1q6Q=s1360-w1360-h1020-rw"
            alt="Alappuzha Light House"
          />
          <div className="place-info">
            <h2>Alappuzha Light House</h2>
            <p><strong>Address:</strong> CCSB Rd, Civil Station Ward, Alappuzha, Kerala 688012</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqWpeHuJfAQcd0RgBF2Vaa6ZMtT88WrkOQYckP-WfYnE1m5PG_OwNGWLA8Ajffiwd_ARf6MlcYQ4_cPCAScAGYx1-vF3cwPxfN0lhPsc_cJLPPzGO0Crfiz1KSHy-_HxS1siooR=s1360-w1360-h1020-rw"
            alt="Cochin: Alleppey Backwater"
          />
          <div className="place-info">
            <h2>Revi Karunakaran Memorial Museum</h2>
            <p><strong>Address:</strong> Boat Jetty Rd, near Boat Jetty, Finishing Point, Alappuzha, Kerala 688006</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/74/7d/4e.jpg"
            alt="Revi Karunakaran Memorial Museum"
          />
          <div className="place-info">
            <h2>Alappuzha Backwaters and House Boat</h2>
            <p><strong>Address:</strong> XVIII/990-A, VCSB Road, near Power House Bridge, Alappuzha, Kerala 688012</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq_-5wd3trsy-DjXMLB0rhkrCzoVgo11uSmA7qZJuVoCVRd1HRJqBA5Y6wVcrE7I9ldeHPPKqYzZEOxEJas_SsODX4vLSNdZWQyAWdqRuckwjiy7NMb3ew7llEuyFI_JtZzVB6NVA=s1360-w1360-h1020-rw"
            alt="Alappuzha Beach"
          />
          <div className="place-info">
            <h2>Marari Beach</h2>
            <p><strong>Address:</strong> Alappuzha (Alleppey), in the state of Kerala, India</p>
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

export default Alappuzha;
