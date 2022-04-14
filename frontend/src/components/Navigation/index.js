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
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/">Sign Up</NavLink>
      </>
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
