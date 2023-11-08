import { Link } from "react-router-dom";
const Home = () => {
    return(
        <div>
            <section>
                <Link to="/groups" > See all groups </Link>
            </section>
            <section>
                <Link to="/events" > Find an event </Link>
            </section>
            {/* <Link to="/groups/new" > Start a new group </Link> */}
        </div>
    );
};

export default Home;
