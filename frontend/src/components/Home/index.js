import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import landinglogo from "../../projectimages/landinglogo.png";
import logofindanevent from "../../projectimages/logofindanevent.png";
import logoseeallgroups from "../../projectimages/logoseeallgroups.png";
import logostartanewgroup from "../../projectimages/logostartanewgroup.png";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SignupFormModal from '../SignupFormModal';
const Home = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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

    return(
        <div>
            <h1>The people platform— <br></br>Where interests <br></br>become friendships</h1>
            <p>What's more fun than getting together with whoever we adore,<br></br> whenever we prefer, and however we want to...
                This is the place <br></br> to discover more things with others (including but not limited to <br></br>meeting with strangers,
                friends, and neighbors online, in person, <br></br> or however you decide upon) and encounter others with surprise,<br></br> joy, tears,
                and many more new ways of doing things, creating<br></br> things, redefining what's norm and yet to be created by us.  </p>
            <img src={landinglogo} alt="landinglogo"/>
            <h3>How SanFranciscoEvents works</h3>
            <p> Discover something new, taste something fresh,<br></br>  and meet something unexpected </p>
            <div>
                <img src={logoseeallgroups} alt="logoseeallgroups"/>
                <button>
                    <Link to="/groups" > See all groups </Link>
                </button>
                <p>View groups that are created by others and you</p>
            </div>
            <div>
                <img src={logofindanevent} alt="logofindanevent"/>
                <button>
                    <Link to="/events" > Find an event </Link>
                </button>
                <p>Looking for some fun events around to join</p>
            </div>
            {sessionUser &&
            <div>
                <img src={logostartanewgroup} alt="logostartanewgroup"/>
                <button>
                    <Link to="/groups/new" > Start a new group </Link>
                </button>
                <p>Going for the creation page for new group in mind</p>
            </div>}
            {!sessionUser &&
            <div>
                <img src={logostartanewgroup} alt="logostartanewgroup"/>
                <button>Start a new group</button>
                <p>Going for the creation page for new group in mind</p>
            </div>}
            <div>
                <button>
                <OpenModalMenuItem
                itemText="Join SanFranciscoEvents"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
                />
                </button>
            </div>
        </div>
    );
};

export default Home;
