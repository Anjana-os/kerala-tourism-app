
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminPage from './pages/Adminpage';
import Choose from './pages/Choose';
import Login from './pages/Login';
import LoginAdmin from './pages/Loginadmin';
import SignUp from './pages/Sign';
import SignUp2 from './pages/Sign2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup2" element={<SignUp2 />} />
      </Routes>
    </Router>
  );
}

export default App;
