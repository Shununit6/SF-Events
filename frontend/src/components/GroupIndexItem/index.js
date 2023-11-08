import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteGroup } from "../../store/groups";

const GroupIndexItem = ({ group }) => {
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteGroup(group.id));
    };

    return (
        <li>
            <div className="li-contents-flex">
                <Link to={`/groups/${group.id}`} key={`${group.id}`}>Group #{group.id}</Link>
                <div className="buttons-container">
                    <Link
                        className="edit-link"
                        to={`/groups/${group.id}/edit`}
                    >
                        Edit
                    </Link>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
};

export default GroupIndexItem;
