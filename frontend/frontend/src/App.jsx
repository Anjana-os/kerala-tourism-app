import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Pages
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Choose from './pages/Choose';
import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';
import Signin from './pages/Signin';

// Components (District Pages)
import Alappuzha from './components/Alappuzha';
import Ernakulam from './components/Ernakulam';
import Idukki from './components/Idukki';
import Kannur from './components/Kannur';
import Kasaragod from './components/Kasaragod';
import Kollam from './components/Kollam';
import Kottayam from './components/Kottayam';
import Kozhikode from './components/Kozhikode';
import Malappuram from './components/Malappuram';
import Palakkad from './components/Palakkad';
import Pathanamthitta from './components/Pathanamthitta';
import Thrissur from './components/Thrissur';
import Trivandrum from './components/Trivandrum';
import Wayanad from './components/Wayanad';

// ✅ Simple 404 Page
const NotFound = () => (
  <h1 style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
    404 - Page Not Found
  </h1>
);

// ✅ Protected Route Component
function ProtectedRoute({ element }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/check-session', {
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();

        if (result.success && result.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminSession();
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        Checking Admin Session...
      </div>
    );
  }

  return isAdmin ? element : <Navigate to="/loginadmin" />;
}

function App() {
  return (
    <Routes>
      {/* ✅ Home Page */}
      <Route path="/" element={<HomePage />} />

      {/* ✅ User Authentication Pages */}
      <Route path="/choose" element={<Choose />} />
      <Route path="/login" element={<Login />} />
      <Route path="/loginadmin" element={<LoginAdmin />} />
      <Route path="/signin" element={<Signin />} />

      {/* ✅ Protected Admin Route */}
      <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />

      {/* ✅ District Routes */}
      <Route path="/district/trivandrum" element={<Trivandrum />} />
      <Route path="/district/kollam" element={<Kollam />} />
      <Route path="/district/pathanamthitta" element={<Pathanamthitta />} />
      <Route path="/district/alappuzha" element={<Alappuzha />} />
      <Route path="/district/kottayam" element={<Kottayam />} />
      <Route path="/district/idukki" element={<Idukki />} />
      <Route path="/district/ernakulam" element={<Ernakulam />} />
      <Route path="/district/thrissur" element={<Thrissur />} />
      <Route path="/district/palakkad" element={<Palakkad />} />
      <Route path="/district/malappuram" element={<Malappuram />} />
      <Route path="/district/kozhikode" element={<Kozhikode />} />
      <Route path="/district/wayanad" element={<Wayanad />} />
      <Route path="/district/kannur" element={<Kannur />} />
      <Route path="/district/kasaragod" element={<Kasaragod />} />
<Route path="/test" element={<h1>Hello Test Page</h1>} />

      {/* ✅ Fallback Route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
