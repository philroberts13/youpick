// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to={`/lists/${sessionUser.id}`} />
  );

  const demoUser = (e) => {
    setCredential("Mr.Demo");
    setPassword("password");
    handleSubmit()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
      <div className='paper-background'>
        <div className='pattern'>
            <h1 className='logo'>youpick </h1><p className='shrug'>¯\_(ツ)_/¯</p>
            <h3 className='tagline'>Never wonder where to eat, where to go, or what to watch next</h3>
            <h2 className='again'>AGAIN</h2>
    <form onSubmit={handleSubmit} className='signupform'>

      <div className='testing'>
      <label className='userName-label'>
        Username or Email...
        <input id='userName-input'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
      </label>

      <label className='password-label'>
        Password...

        <input className='password-input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
      </label>
      </div>
      <button className='login-button' type="submit">Log In</button>
      <button className='demo-button' onClick={demoUser}>Demo User</button>
      <ul className='errors'>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
    </form>
    </div>
    </div>
  );
}

export default LoginFormPage;
