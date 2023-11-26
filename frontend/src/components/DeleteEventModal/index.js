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
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleEventDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteEvent(eventId));
        removeGroupEvents(event.groupId);
        closeModal();
        history.push(`/groups/${groupId}`);
    };

    return (
        <div id="deleteeventmodal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this event?</p>
            <button id="yesdeleteevent" onClick={handleEventDelete}> Yes (Delete Event) </button>
            <button id="nokeepevent" onClick={closeModal}> No (Keep Event) </button>
        </div>
    );
};

export default DeleteEventModal;
