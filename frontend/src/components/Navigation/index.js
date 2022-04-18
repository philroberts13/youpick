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
      <NavLink exact to={`/lists/${sessionUser.id}`}>Home</NavLink>
      </>
    )
  } else {
    sessionLinks = (
      <div className='links'>
        <div className='login-button'><NavLink style={{textDecoration: 'none'}} to="/login">Log In</NavLink></div>
        <NavLink style={{textDecoration: 'none'}} to="/">Sign Up</NavLink>
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
