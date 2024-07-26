import './App.css';
import Home from './pages/Home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// New Spinner component
const Spinner = () => (
  <div className="spinner-overlay">
    <div className="spinner"></div>
  </div>
);

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In");
        if (window.location.pathname === '/login') {
          toast.success("Logged In");
          navigate("/");
        }
      } else {
        console.log("Logged Out");
        if (window.location.pathname !== '/login') {
          toast.info("Logged Out");
          navigate("/login");
        }
      }
      setLoading(false);
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;