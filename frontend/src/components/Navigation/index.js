import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import navlogo from "../../projectimages/navlogo.png";


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  return (
    <nav>
          <NavLink exact to="/" src="../../../public/images/navlogo.png">
            <img id="logoImage" src={navlogo} alt="logoimage"/>
          </NavLink>
      <div id="navusergroup">
          {sessionUser &&
                <Link to="/groups/new" id="greennavstartnew"> Start a new group </Link>
            }
          {isLoaded && (
              <ProfileButton user={sessionUser} />
            )}
      </div>
    </nav>
  );
}

export default Navigation;
