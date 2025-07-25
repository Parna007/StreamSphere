// src/pages/Login.js
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase.js';
import axios from 'axios';
import '../../styles/signUp.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Get the Firebase ID token
      const idToken = await user.getIdToken();

      // Send token to backend
      const res = await axios.post('http://localhost:5000/api/auth/google-login', {}, {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });

      console.log("User saved:", res.data);
      alert("Login successful!");
      navigate('/');
    } catch (err) {
      console.error("Google login error", err);
    }
  };

  return (
    <div className='box'>
      <div className='form'>
        <h2 className='lebel'>Unlimited Movies & More, Ready To Login?</h2> 
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
      </div>
    </div>
  );
};

export default Login;
