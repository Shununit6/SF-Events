// import { NavLink, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { deleteGroup } from "../../store/groups";

const GroupIndexItem = ({ group }) => {
    // const dispatch = useDispatch();

    // const handleDelete = (e) => {
    //     e.preventDefault();
    //     dispatch(deleteGroup(group.id));
    // };
    // const {id, organizerId, name, about, type, city, state, createdAt, updatedAt} = group;
    const {name, about, city, state } = group;
    let isPrivate;
    if(group.private){
        isPrivate = "Private";
    }else{
        isPrivate = "Public";
    }
    return (
        <li>
            <div className="li-contents-flex">
                <p>{name}</p>
                <p>{city}, {state}</p>
                <p>{about}</p>
                <p>{isPrivate}</p>
            </div>
        </li>
    );
};

export default GroupIndexItem;
