import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
import { useHistory,} from "react-router-dom"; //useParams,
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteEvent.css";
import { deleteEvent, removeGroupEvents } from "../../store/events";

const DeleteEventModal = ({event}) => {
    const eventId = event.id;
    const groupId = event.groupId;
    // console.log("deletemodal", eventId);
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const sessionUser = useSelector(state => state.session.user);
    // const [isLoaded, setIsLoaded] = useState(false);
    const handleEventDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteEvent(eventId));
        removeGroupEvents(event.groupId);
        // console.log("removeGroupEvents");
        closeModal();
        history.push(`/groups/${groupId}`);
    };

    return (
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this event?</p>
            <button onClick={handleEventDelete}> Yes (Delete Event) </button>
            <button onClick={closeModal}> No (Keep Event) </button>
        </div>
    );
};

export default DeleteEventModal;
