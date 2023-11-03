import '../styles/Login.css'
import React from 'react';

const Login = () => {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </form>
      <p className="forgot-password">
        <a href="../main/forgot">Forgot Password?</a>
      </p>
      <div className="or-divider">
        <div className="divider-line"></div>
        <p>Or</p>
        <div className="divider-line"></div>
      </div>
      <div className="google-signin">
        
        
        <p>login using</p>
        <div className='logo'>
        <img
          src="https://img.icons8.com/fluent/48/000000/google-logo.png"
          alt="Google Logo"
        /></div>
      </div>
      
      <p className="noaccount">
        Dont have an account? 
        <a href="../main/signin"> Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
