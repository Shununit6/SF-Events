import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = (e) => {
    e.stopPropagation();
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    {!showMenu &&
        <button id="closeMenuNavButton" onClick={openMenu}>
          <i className="fas fa-user-circle" />
          <i className="fas fa-sort-up"></i>
        </button>}
        {showMenu &&
        <button id="closeMenuNavButton" onClick={closeMenu}>
        <i className="fas fa-user-circle" />
        <i className="fas fa-sort-down"></i>
        </button>}
      {showMenu &&
      <section className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstname}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}><Link to="/" >Log Out</Link></button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </section>}
    </>
  );
}

export default ProfileButton;
