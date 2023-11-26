import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
import { useHistory,} from "react-router-dom"; //useParams,
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteGroup.css";
import { deleteGroup } from "../../store/groups";
import {removeGroupEvents} from "../../store/events";

const DeleteGroupModal = ({group}) => {
    const groupId = group.id;
    // console.log("deletemodal", groupId);
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const sessionUser = useSelector(state => state.session.user);
    // const [isLoaded, setIsLoaded] = useState(false);
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteGroup(groupId));
        // console.log("removeGroupEvents(groupId)");
        removeGroupEvents(groupId);
        // console.log("removeGroupEvents");
        closeModal();
        history.push(`/groups`);
    };

    return (
        <div id="deletegroupmodal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this group?</p>
            <button id="yesdeletegroup" onClick={handleDelete}> Yes (Delete Group) </button>
            <button id="nokeepgroup" onClick={closeModal}> No (Keep Group) </button>
        </div>
    );
};

export default DeleteGroupModal;
