import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsAuth }) {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem('isAuth', true);
        setIsAuth(true);
        navigate('/');
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="loginPage">
      <div className="loginBox">
        <p>Sign in with google to continue</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
