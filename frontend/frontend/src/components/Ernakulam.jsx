import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

  const Ernakulam = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch admin-added places when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/places/ernakulam')
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
  localStorage.clear(); // or sessionStorage.clear()
  navigate('/'); // Redirect to your login or home page
};

 return (
    <div className="district-bg">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Ernakulam - Tourist Places</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>
  

      <main className="place-gallery">
        {/* ✅ Static Places */}
        <div className="place-card">
          <img
            src="https://cdn.s3waas.gov.in/s3621bf66ddb7c962aa0d22ac97d69b793/uploads/bfi-thumb/2018031969-olw9p1xykmfy9jkliaqrvtk0l802vcvswfzfi7pxu2.jpg"
            alt="Fort Kochi"
          />
          <div className="place-info">
            <h2>Fort Kochi</h2>
            <p><strong>Address:</strong> Fort Kochi, Kochi, Kerala, 682001</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://cdn.s3waas.gov.in/s3621bf66ddb7c962aa0d22ac97d69b793/uploads/bfi-thumb/2018041632-olw9opptp6donoard5kyywn9d5k1grda2b9atvlsr6.jpg"
            alt="Edapally St. George Forane Church"
          />
          <div className="place-info">
            <h2>Edapally St. George Forane Church</h2>
            <p><strong>Address:</strong> Palarivattom - Edappally Rd, Ponekkara, Edappally, Kochi, Ernakulam, Kerala 682024</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://cdn.s3waas.gov.in/s3621bf66ddb7c962aa0d22ac97d69b793/uploads/bfi-thumb/2018032226-olw9p2vsrgh8l5j8ct5egbbh6lvg31zj8kmwzhojnu.jpg"
            alt="Cherai Beach"
          />
          <div className="place-info">
            <h2>Cherai Beach</h2>
            <p><strong>Address:</strong> Cherai, Vypin Island, Kochi, Kerala, 683514</p>
          </div>
        </div>

        <div className="place-card">
          <img
            src="https://cdn.s3waas.gov.in/s3621bf66ddb7c962aa0d22ac97d69b793/uploads/bfi-thumb/2018031654-olw9p104dsenxxlynsc5bbsjzu4pnns2kbby0xrc0a.jpg"
            alt="Hill Palace"
          />
          <div className="place-info">
            <h2>Hill Palace</h2>
            <p><strong>Address:</strong> Hill Palace Road, Tripunithura, Ernakulam, Kerala, 682301</p>
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

export default Ernakulam;
