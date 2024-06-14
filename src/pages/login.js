import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';
import UserContext from '../inc/UserContext'; // Adjust the import path as necessary

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext); // Use the context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://msmeserver.onrender.com/login', { username, password });
      if (response.data.success) {
        setUserData(response); // Set the user data
        navigate("/admin");
       
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.',err);
    }
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <title>Admin Login</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/fontawesome.css" />
      <link rel="stylesheet" href="admin/src/styles/login.css" />
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={handleLogin}>
              <div className="login__field">
                <h1>Admin Login</h1>
                <div className="form-group">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    className="login__input"
                    placeholder="User name / Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="login__field">
                <div className="form-group">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    className="login__input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
              <button
                className="button login__submit"
                style={{ backgroundColor: "white", color: "black", border: "1px solid black" }}
              >
                LOGIN
                <i className="button__icon fas fa-chevron-right" />
              </button>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4" />
            <span className="screen__background__shape screen__background__shape3" />
            <span className="screen__background__shape screen__background__shape2" />
            <span className="screen__background__shape screen__background__shape1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
