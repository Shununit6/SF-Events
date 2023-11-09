import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { groupDetails } from "../../store/groups";
import { deleteGroup } from "../../store/groups";

const GroupDetails = () => {
    const dispatch = useDispatch();
    let { groupId } = useParams();
    groupId = parseInt(groupId);
    const [isLoaded, setIsLoaded] = useState(false);
    const groupDetail = useSelector((state) => state.groups[groupId]);

    useEffect(() => {
        dispatch(groupDetails(groupId)).then(()=>setIsLoaded(true))
    }, [dispatch, groupId])

    if(!isLoaded) {
        return (<div>Loading...</div>);
    }
    // const {id, organizerId, name, about, type, city, state, createdAt, updatedAt} = groupDetail;
    const { name, about, city, state } = groupDetail;
    let isPrivate;
    if(groupDetail.private){
        isPrivate = "Private";
    }else{
        isPrivate = "Public";
    }
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteGroup(groupId));
    };
    if(isLoaded){
        return(
            <div>
                <Link to={`/groups/${groupId}`}></Link>
                <img src={`https://picsum.photos/200/300?random=${groupId}`}/>
                <p>{name}</p>
                <p>{city}, {state}</p>
                <p>##events</p>
                <p>{isPrivate}</p>
                <p>organized by firstName lastName</p>

                <div className="buttons-container">
                    <button>Join this group</button>
                    <button>Create event</button>
                    <button>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>

                <h1>Organizer</h1>
                <h1>What we're about</h1>
                <p>{about}</p>
                <h1>Upcoming Events(#)</h1>
                <h1>Past Events(#)</h1>
            </div>
        );
    }

};

export default GroupDetails;
