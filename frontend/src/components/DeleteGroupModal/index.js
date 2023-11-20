import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
import { useHistory,} from "react-router-dom"; //useParams,
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteGroup.css";
import { deleteGroup } from "../../store/groups";

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
        closeModal();
        history.push(`/groups`);
    };

    return (
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this group?</p>
            <button onClick={handleDelete}> Yes (Delete Group) </button>
            <button onClick={closeModal}> No (Keep Group) </button>
        </div>
    );
};

export default DeleteGroupModal;
