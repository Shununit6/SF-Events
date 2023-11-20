import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import "../../images-web/";


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const logosrc="data:image/png;base64,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";

  return (
    <nav>
          <NavLink exact to="/" src="../../../public/images/navlogo.png">
            <img id="logoImage" src={logosrc} alt="logoimage"/>
          </NavLink>
      <div id="navusergroup">
          {sessionUser &&
                <Link to="/groups/new" > Start a new group </Link>
            }
          {isLoaded && (
              <ProfileButton user={sessionUser} />
            )}
      </div>
    </nav>
  );
}

export default Navigation;
