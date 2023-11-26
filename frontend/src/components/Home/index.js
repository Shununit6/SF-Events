import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import landinglogo from "../../projectimages/landinglogo.png";
import logofindanevent from "../../projectimages/logofindanevent.png";
import logoseeallgroups from "../../projectimages/logoseeallgroups.png";
import logostartanewgroup from "../../projectimages/logostartanewgroup.png";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SignupFormModal from '../SignupFormModal';
import "./Home.css";
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
        <div id="landingpage">
            <div id="landingpagetopsection">
                <h1>The people platform— <br></br>Where interests <br></br>become friendships</h1>
                <p>What's more fun than getting together with whoever we adore,<br></br> whenever we prefer, and however we want to...
                    This is the place <br></br> to discover more things with others (including but not limited to <br></br>meeting with strangers,
                    friends, and neighbors online, in person, <br></br> or however you decide upon) and encounter others with surprise,<br></br> joy, tears,
                    and many more new ways of doing things, creating<br></br> things, redefining what's norm and yet to be created by us.  </p>
            </div>
            <img id="landinglogopng" src={landinglogo} alt="landinglogo"/>
            <div id="landingpagemidsection">
                <h3>How SanFranciscoEvents works</h3>
                <p> Discover something new, taste something fresh,<br></br>  and meet something unexpected </p>
            </div>
            <div id="sectionseeallgroups">
                <img src={logoseeallgroups} alt="logoseeallgroups"/>
                <div>
                    <Link to="/groups" id="greenseeallgroups"> See all groups </Link>
                </div>
                <p>View groups that are <br></br> created by others and you</p>
            </div>
            <div id="sectionfindanevent">
                <img src={logofindanevent} alt="logofindanevent"/>
                <div>
                    <Link to="/events" id="greenfindanevent"> Find an event </Link>
                </div>
                <p>Looking for some fun <br></br> events around to join</p>
            </div>
            {sessionUser &&
            <div id="sectionstartanewgroup">
                <img src={logostartanewgroup} alt="logostartanewgroup"/>
                <div>
                    <Link to="/groups/new" id="greenstartanew"> Start a new group </Link>
                </div>
                <p>Going for the creation <br></br> page for new group in mind</p>
            </div>}
            {!sessionUser &&
            <div id="sectionstartanewgroup">
                <img src={logostartanewgroup} alt="logostartanewgroup"/>
                <div id="greystartanew">Start a new group</div>
                <p>Going for the creation<br></br> page for new group in mind</p>
            </div>}
            <div id="sectionsjoinsfe">
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
