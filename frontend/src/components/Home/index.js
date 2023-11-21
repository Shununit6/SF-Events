import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import landinglogo from "../../projectimages/landinglogo.png";
import logofindanevent from "../../projectimages/logofindanevent.png";
import logoseeallgroups from "../../projectimages/logoseeallgroups.png";
import logostartanewgroup from "../../projectimages/logostartanewgroup.png";
const Home = () => {
    const sessionUser = useSelector((state) => state.session.user);
    return(
        <div>
            <h1>The people platform— <br></br>Where interests <br></br>become friendships</h1>
            <p>What's more fun than getting together with whoever we adore,<br></br> whenever we prefer, and however we want to...
                This is the place <br></br> to discover more things with others (including but not limited to <br></br>meeting with strangers,
                friends, and neighbors online, in person, <br></br> or however you decide upon) and encounter others with surprise,<br></br> joy, tears,
                and many more new ways of doing things, creating<br></br> things, redefining what's norm and yet to be created by us.  </p>
            <h3>How San Francisco Events works</h3>
            <p> Discover something new, taste something fresh,<br></br>  and meet something unexpected </p>
            <img src={landinglogo} alt="landinglogo"/>
            <div>
                <img src={logoseeallgroups} alt="logoseeallgroups"/>
                <Link to="/groups" > See all groups </Link>
            </div>
            <div>
                <img src={logofindanevent} alt="logofindanevent"/>
                <Link to="/events" > Find an event </Link>
            </div>
            {sessionUser &&
            <div>
                <img src={logostartanewgroup} alt="logostartanewgroup"/>
                <Link to="/groups/new" > Start a new group </Link>
            </div>}
        </div>
    );
};

export default Home;
