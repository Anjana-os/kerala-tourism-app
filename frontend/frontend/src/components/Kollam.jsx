import React, { useEffect, useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom';
const Kollam = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  // Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/kollam') // 👈 Ensure district is stored as 'kollam' in lowercase in DB
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
        <h1>Kollam - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>
      <main className="place-gallery">
        {/* ✅ Hardcoded Tourist Places */}
        <div className="place-card">
          <img
            src="https://jatayuearthscenter.in/wp-content/uploads/2020/06/hill1-1.jpg"
            alt="Jatayu Earth's Center (Adventure Park)"
          />
          <div className="place-info">
            <h2>Jatayu Earth's Center (Adventure Park)</h2>
            <p><strong>Address:</strong> Jatayu Nature Park Rd, Jatayu Junction, Chadayamangalam, Kerala 691534</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://www.tourmyindia.com/states/kerala/images/ashtamudi-beach-kollam-1.jpg"
            alt="Ashtamudi Lake"
          />
          <div className="place-info">
            <h2>Ashtamudi Lake</h2>
            <p><strong>Address:</strong> VHXC+9RP Ashtamudi Lake, Kollam, Kerala 691012</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq7C2DyGm9NvKGB-pGytzNqAl7eEjlxAwOG_rd6dhI4AhifOufHglWOqGvAfBHJJACXoJ4O-xQ_gp6paFzRu5323WkPZiA7otx8nPDgC7oJLMS-eIMsJPDuqUbuJg_fkaw_Mvf7=s1360-w1360-h1020-rw"
            alt="Adventure Park, Kollam"
          />
          <div className="place-info">
            <h2>Adventure Park, Kollam</h2>
            <p><strong>Address:</strong> Behind, Guest House Rd, Asramam, Kollam, Kerala 691001</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://www.keralatourism.org/uploads/kerala-365/share-img/munroe-island-a-slice-of-heaven-20211030104120864552.jpg"
            alt="Munroe Island"
          />
          <div className="place-info">
            <h2>Munroe Island</h2>
            <p><strong>Address:</strong> 2J2J+PG4, Munroe Island, Kerala 691502, India</p>
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

export default Kollam;
