import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/events";

const EventIndexItem = ({ event }) => {
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteEvent(event.id));
    };

    return (
        <li>
            <div className="li-contents-flex">
                <Link to={`/events/${event.id}`} key={`${event.id}`}>Event #{event.id}</Link>
                <div className="buttons-container">
                    <Link
                        className="edit-link"
                        to={`/events/${event.id}/edit`}
                    >
                        Edit
                    </Link>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
};

export default EventIndexItem;
