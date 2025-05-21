import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import SignUpForm from './pages/signUp/SignUpForm';
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_SIGNUP, ROUTE_STUDENT, ROUTE_TEACHER } from './routes/constants';
import { ToastContainer } from 'react-toastify';
import Login from './pages/login/Login';
import { useEffect, useState } from 'react';

function App() {
  type User = {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'student' | 'teacher';
  };

  const [user, setUser] = useState<User | null>(null);

  // On mount, load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Raw parsed user from localStorage:", parsedUser);
        
        // Handle potential nested user object
        const userData = parsedUser.user ? parsedUser.user : parsedUser;
        setUser(userData);
        
        console.log("User loaded from localStorage:", userData);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  console.log("Current user state:", user); // Debug log

  return (
    <div>
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          {user && user.role === 'admin' ? (
            <>
              <Route path={ROUTE_TEACHER} element={<Teacher />} />
              <Route path="*" element={<Navigate to={ROUTE_TEACHER} />} />
            </>
          ) : (
            <>
              <Route path={ROUTE_HOME} element={<Home />} />
              <Route path={ROUTE_STUDENT} element={<Student />} />
              <Route path={ROUTE_SIGNUP} element={<SignUpForm />} />
              <Route path={ROUTE_LOGIN} element={<Login setUser={setUser} />} />
              <Route path="*" element={<Navigate to={ROUTE_HOME} />} />
            </>
          )}
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;