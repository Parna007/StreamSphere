// src/pages/Login.js
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase.js';
import axios from 'axios';
import '../../styles/signUp.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      window.location.href = "http://localhost:8000/api/auth/google";
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
