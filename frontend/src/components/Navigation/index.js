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
        <>
      <ProfileButton user={sessionUser} />
      <NavLink style={{textDecoration: 'none', color: "blue"}} exact to={`/lists/${sessionUser.id}`}>Home</NavLink>
      </>
    )
  } else {
    sessionLinks = (
      <div className='links'>
        <div className='login-button'><NavLink style={{textDecoration: 'none', color: "blue"}} to="/login">Log In</NavLink></div>
        <NavLink style={{textDecoration: 'none', color:"blue"}} to="/">Sign Up</NavLink>
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
