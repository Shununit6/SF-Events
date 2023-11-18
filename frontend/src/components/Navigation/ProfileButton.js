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

  const logInDemo = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    closeMenu();
    // logout();
    // Hello, Demo-lition demo@user.io
    const credential = "demo@user.io";
    const password ="password"
    return await dispatch(sessionActions.login( { credential, password} ))
    // return dispatch(sessionActions.login( { demoUser, demoUserPass} ));
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div id="profileNavButtonMenuItem">
        {!showMenu &&
        <button id="openMenuNavButton" onClick={openMenu}>
          <i className="fas fa-user-circle" />
          <i className="fas fa-sort-up"></i>
        </button>}
        {showMenu &&
        <button id="closeMenuNavButton" onClick={closeMenu}>
        <i className="fas fa-user-circle" />
        <i className="fas fa-sort-down"></i>
        </button>}
      <section className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logInDemo}>
                <Link to="/" >Log in as Demo User</Link>
              </button>
            </li>
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
      </section>
    </div>
  );
}

export default ProfileButton;
