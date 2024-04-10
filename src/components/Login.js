import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import axios from 'axios';
import { baseURL } from '../Server';
import { jwtDecode } from 'jwt-decode';
import { UserInformationContext } from '../context/UserInformationContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setToken } = useContext(LoginContext);
  const token = localStorage.getItem("login")
  const { setCurrentUserId } = useContext(UserInformationContext);
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        email: email,
        password: password
      });
      const token = response.data.token;
      setToken(token);
      const decodedToken = jwtDecode(token);
      setCurrentUserId(decodedToken.nameid);
      localStorage.setItem("login", token);
      if (token) {
        navigate("/");
      }

    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <>

      {token ? <Navigate to='/' /> : (
        <div>
          <h2>Login</h2>
          {error && <div className="error">{error}</div>}
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </>
  );
};

export default Login;
