import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {NavLink, useHistory} from 'react-router-dom'


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/login')
  };

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        Profile
      </button>
      {showMenu && (
          <div className="drop-down-menu">
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <ul>
            <button style={{color: "blue"}} onClick={logout}>Log Out</button>
          </ul>
        </ul>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
