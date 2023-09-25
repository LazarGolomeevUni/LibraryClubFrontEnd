import React, { useContext, useState } from 'react';
import './log-in-page.css'
import { Link, Outlet } from 'react-router-dom';
import AuthContext from '../../components/AuthContext/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext) ?? {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };
  const loginSubmit = async () => {
    let payload = {
      username: email,
      password: password,
    };
    
    console.log('Email:', email);
    console.log('Password:', password);
    await login?.(payload);
  };

  return (
    <div className='body'>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="login-form">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className='but' type="button" onClick={loginSubmit}>Log In</button>
      </form>
    </div>
  );
};

export default Login;
