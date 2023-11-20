import { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { eventDetails } from "../../store/events";
import { getAllGroups, groupDetails} from "../../store/groups";
import DeleteModal from '../Navigation/DeleteModel';
import DeleteEventModal from "../DeleteEventModal";
const EventDetails = () => {
    const dispatch = useDispatch();
    let { eventId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [isLoading, setIsLoading] = useState(true);
    const eventData = useSelector((state) => state.events[eventId]);
    let groupId = eventId;
    if(eventData){
        groupId = eventData.groupId;
    }
    const groupData = useSelector((state) => state.groups);
    useEffect(() => {
        dispatch(eventDetails(eventId)).then(()=>dispatch(getAllGroups())).then(()=>dispatch(groupDetails(groupId))).then(()=>setIsLoading(false))
    }, [dispatch, eventId, groupId])

    if(!isLoading && !eventData){
        return (<Redirect to="/events"/>);
    }

    if (isLoading) {
        return (<div>Loading...</div>);
    }

    const {name, startDate, endDate, price} = eventData;
    let imageUrl="";
    if(eventData.EventImages.length > 0){
        imageUrl = eventData.EventImages.find((image) => image.preview == 1).url;
    }
    groupId = eventData.groupId;

    let isEventCreator=false;
    let organizerId = groupData[eventData.groupId].organizerId;
    if(sessionUser && organizerId === sessionUser.id){
        isEventCreator=true;
    }
    let firstName, lastName;
    if(groupData[eventData.groupId].Organizer){
        ({firstName, lastName} = groupData[eventData.groupId].Organizer);
        console.log(groupData[eventData.groupId].Organizer.firstName);
        console.log(groupData[eventData.groupId].Organizer.lastName);
    }

    if(!isLoading){
    return(
        <div>
            <Link to="/events" > Events </Link>
            <h1>{name}</h1>
            <p>Hosted by {firstName} {lastName}</p>
            <img id="images" src={imageUrl} alt="event"/>
            <p>{name}</p>
            <i className="fa-regular fa-clock"></i>
            <p>START {startDate.slice(0, 10)}</p>
            <p>END {endDate.slice(0, 10)}</p>
            <i className="fa-solid fa-dollar-sign"/>
            {/* <FontAwesomeIcon icon="fa-regular fa-clock" /> */}
            <i className="fas fa-user-circle"></i>
            <i className="fas fa-sort-down"/>
            <p>{price}</p>
            {/* <p>{groupData}</p> */}
            {/* Action button shows if logged-in user is the creator of the event */}
            {sessionUser && isEventCreator ? <DeleteModal
                                itemText="Delete"
                                modalComponent={<DeleteEventModal event={eventData}/>}
                                /> :null}
        </div>
        /*
                <div id="grid">
                    <div id="itemeventdetail1">
                        <img id = "eventImage" src={imageUrl} alt="event"/>
                    </div>
                    <div id="itemeventdetail2">
                        <p>{startDate.slice(0,10)}</p>
                        <h1>{name}</h1>
                        <p>{location}</p>
                    </div>
                    <div id="itemeventdetail3">
                        <p>{description}</p>
                    </div>
                </div>
        */
    );}
};

export default EventDetails;
