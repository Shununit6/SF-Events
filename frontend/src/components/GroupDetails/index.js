import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { groupDetails, getGroupIdEvents } from "../../store/groups";
import { deleteGroup } from "../../store/groups";
import "./GroupDetails.css";
const GroupDetails = () => {
    const dispatch = useDispatch();
    let { groupId } = useParams();
    groupId = parseInt(groupId);
    const [isLoaded, setIsLoaded] = useState(false);
    const groupDetail = useSelector((state) => state.groups[groupId]);
    useEffect(() => {
        dispatch(groupDetails(groupId)).then(()=>dispatch(getGroupIdEvents(groupId))).then(()=>setIsLoaded(true))
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

    let numOfEvents = 0;
    if(groupDetail.events){
        numOfEvents = Object.values(groupDetail.events).length;
    }
    let imageUrl;
    if(!Object.values(groupDetail.GroupImages)[0].url){
        imageUrl = null;
    }else{
        imageUrl = Object.values(groupDetail.GroupImages)[0].url;
    }
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteGroup(groupId));
    };
    if(isLoaded){
        return(
            <div>
                <Link to={`/groups/${groupId}`}></Link>
                <img id="images" src={imageUrl} alt="group"/>
                {/* <img alt="random group"src={`https://picsum.photos/200/300?random=${groupId}`}/> */}
                <p>{name}</p>
                <p>{city}, {state}</p>
                <p>{numOfEvents} events</p>
                <p>{isPrivate}</p>
                <p>organized by firstName lastName</p>

                <div className="buttons-container">
                    <button>Join this group</button>
                    {/* <Link to="/groups/new">
                        <button onClick="/groups/new">Create event</button>
                    </Link>
                    onClick={"/groups/new"}
                    onClick={`/groups/${groupId}/edit`}
                    onClick={handleDelete}
                    */}
                    <button >Create event</button>
                    <button >Update</button>
                    <button >Delete</button>
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
