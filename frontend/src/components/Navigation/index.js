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
        <div className='login-button'><NavLink style={{textDecoration: 'none', color: "blue"}} to="/">Log In</NavLink></div>
        <NavLink style={{textDecoration: 'none', color:"blue"}} to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <ul>
      <li className='rightSide'>

        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
