import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './Signup.css';


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to={`/lists/${sessionUser.id}`} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
      <div className="paper-background">
      <div className='pattern'>
      <h1 className='logo'>youpick</h1><p className='shrug'>¯\_(ツ)_/¯</p>
    <form onSubmit={handleSubmit} className='signupform'>

      <label className="label">
        Email...
        <input className="signup-label-email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

        />
      </label>
      <label>
        Username...
        <input className="signup-label-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}

        />
      </label>
      <label>
        Password...
        <input className="signup-label-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
      </label>
      <label>
        Confirm Password...
        <input className="signup-label"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}

        />
      </label>
      <button className='login-button' type="submit">Sign Up</button>
      <ul className="errors">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

    </form>
    <div className='footer-signup'>About me-->
    <a href="https://linkedin.com/in/philip-roberts-2b218416a" target={"blank"} className='linkedIn' style={{textDecoration: 'none', color: 'blue'}}>LinkedIn</a>
    <a href="https://github.com/philroberts13/youpick" target={"blank"} className="github" style={{textDecoration: 'none', color: 'black'}}>Github</a>
    </div>
    </div>
    </div>
  );
}

export default SignupFormPage;
