import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
        <div className='links'>
      <NavLink className='nav-buttons' style={{textDecoration: 'none', color: "blue"}} exact to={`/lists/${sessionUser.id}`}>Your Lists</NavLink>
      <ProfileButton user={sessionUser} className="profile-button" />
      </div>
    )
  } else {
    sessionLinks = (
      <div className='links'>
        <div className='login-button'><NavLink style={{textDecoration: 'none', color: "black"}} to="/">Log In</NavLink></div>
        <NavLink style={{textDecoration: 'none', color:"blue"}} to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <ul className='notePad'>
      <li className='rightSide'>

        {isLoaded && sessionLinks}
        <div className='aboutMe'>
        <a href="https://linkedin.com/in/philip-roberts-2b218416a" target={"blank"} className='linkedIn' style={{textDecoration: 'none', color: 'blue'}}>LinkedIn</a>
        <a href="https://github.com/philroberts13/youpick" target={"blank"} className="github" style={{textDecoration: 'none', color: 'black'}}>Github</a>
        </div>
      </li>
    </ul>
  );
}

export default Navigation;
