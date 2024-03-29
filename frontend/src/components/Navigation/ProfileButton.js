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
    <div id="profileNavButtonMenuItem">
      {(!user) &&
        <div id="menuitemlogin">
          <OpenModalMenuItem
          itemText="Log In"
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
          />
        </div>
      }
      {(!user) &&
        <div id="menuitemsignup">
        <OpenModalMenuItem
        itemText="Sign Up"
        onItemClick={closeMenu}
        modalComponent={<SignupFormModal />}
        />
        </div>
      }
      <div id="iconandcloseopenmenu">
      {user && !showMenu &&
        <div id="openMenuNavButton" onClick={openMenu}>
          <i className="fas fa-user-circle fa-2x"/>
          <i className="fas fa-sort-down fa-2x"></i>
        </div>}
      {user && showMenu &&
        <div id="closeMenuNavButton" onClick={closeMenu}>
        <i className="fas fa-user-circle fa-2x"/>
        <i className="fas fa-sort-up fa-2x"></i>
        </div>}
      <section className={ulClassName} ref={ulRef}>
        {user ? (
          <div id="menuwithlogout">
            <div>Hello, {user.firstName}</div>
            <div>{user.email}</div>
            <div>
                 <Link id="menuviewgroups"to="/groups" > View groups </Link>
            </div>
            <div>
                 <Link id="menuviewevents"to="/events" > View events </Link>
            </div>
            <div>
              <hr/>
              <div onClick={logout}><Link id="menulogout" to="/" >Log Out</Link></div>
            </div>
          </div>
        ) : null}
      </section>
      </div>
    </div>
  );
}

  // return (
  //   <div id="profileNavButtonMenuItem">
  //       {!showMenu &&
  //       <button id="openMenuNavButton" onClick={openMenu}>
  //         <i className="fas fa-user-circle fa-2x"/>
  //         <i className="fas fa-sort-down fa-2x"></i>
  //       </button>}
  //       {showMenu &&
  //       <button id="closeMenuNavButton" onClick={closeMenu}>
  //       <i className="fas fa-user-circle fa-2x"/>
  //       <i className="fas fa-sort-up fa-2x"></i>
  //       </button>}
  //     <section className={ulClassName} ref={ulRef}>
  //       {user ? (
  //         <div id="menuwithlogout">
  //           <div>Hello, {user.firstName}</div>
  //           <div>{user.email}</div>
  //           <div>
  //                <Link id="menuviewgroups"to="/groups" > View groups </Link>
  //           </div>
  //           <div>
  //             <button onClick={logout}><Link to="/" >Log Out</Link></button>
  //           </div>
  //         </div>
  //       ) : (
  //         <>
  //           <OpenModalMenuItem
  //             itemText="Log In"
  //             onItemClick={closeMenu}
  //             modalComponent={<LoginFormModal />}
  //           />
  //           <OpenModalMenuItem
  //             itemText="Sign Up"
  //             onItemClick={closeMenu}
  //             modalComponent={<SignupFormModal />}
  //           />
  //         </>
  //       )}
  //     </section>
  //   </div>
  // );
// }

export default ProfileButton;
