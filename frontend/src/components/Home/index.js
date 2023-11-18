import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
const Home = () => {
    const sessionUser = useSelector((state) => state.session.user);
    return(
        <div>
            <div>
                <Link to="/groups" > See all groups </Link>
            </div>
            <div>
                <Link to="/events" > Find an event </Link>
            </div>
            {sessionUser &&
            <div>
                <Link to="/groups/new" > Start a new group </Link>
            </div>}
        </div>
    );
};

export default Home;
