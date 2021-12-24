import './styles.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate
} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import { useState } from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    });
  };
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {isAuth && <Link to="/createpost">CreatePost</Link>}
        {!isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={signUserOut}>Log Out</button>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}
