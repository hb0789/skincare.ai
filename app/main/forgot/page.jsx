import '../styles/Forgot.css'
import React from 'react';

const Forgot = () => {
  return (
    <div className="login-container">
      <h1>Forgot Password</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Enter older password" />
        <input type="password" placeholder="New Password" />
        <button>Change</button>
      </form>
      
      <div className="or-divider">
        <div className="divider-line"></div>
        <p>Or</p>
        <div className="divider-line"></div>
      </div>
      <div className='tex'>
        Sign in using
      </div>
      <div className="google-signin">
        
        
        <div className='logo'>
        <img
          src="https://img.icons8.com/fluent/48/000000/google-logo.png"
          alt="Google Logo"
        /></div>
      </div>
    </div>
  );
};

export default Forgot;
