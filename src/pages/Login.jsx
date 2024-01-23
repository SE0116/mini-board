import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // const handleSignupClick = () => {
  //   navigate('/signup');
  // };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    if ( password === 'password') {
      setIsAuthenticated(true);
      alert('로그인 성공');
      navigate('/main');
    }
    else {
      alert('로그인 실패');
    }
  }

  return (
    <div className="login-container">
      <div className="guide1">Log in</div>
      <br /><br />
      <div className="guide2" id>로그인을 하고 게시판을 자유롭게 이용해보세요</div>
      <br /><br /><br /><br /><br />
      {isAuthenticated ? (
        <p>{username}</p>
        ) : (
        <form onSubmit={handleLogin}>
          <label htmlFor="username">ID</label>
          <br /><br />
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
          <br /><br /><br />
          <label htmlFor="password">Password</label>
          <br /><br />
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <br /><br /><br /><br />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;