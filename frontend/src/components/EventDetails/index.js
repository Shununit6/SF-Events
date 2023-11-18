import { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { eventDetails } from "../../store/events";
import { getAllGroups} from "../../store/groups";
import DeleteModal from '../Navigation/DeleteModel';
import DeleteEventModal from "../DeleteEventModal";
const EventDetails = () => {
    const dispatch = useDispatch();
    let { eventId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [isLoading, setIsLoading] = useState(true);
    const eventData = useSelector((state) => state.events[eventId]);
    const groupData = useSelector((state) => state.groups);

    useEffect(() => {
        dispatch(getAllGroups()).then(dispatch(eventDetails(eventId))).then(()=>setIsLoading(false))
    }, [dispatch, eventId])

    if(!isLoading && !eventData){
        return (<Redirect to="/events"/>);
    }

    if (isLoading) {
        return (<div>Loading...</div>);
    }
    // const groupData = useSelector((state) => state.groups);
    const {name, startDate, endDate} = eventData;
    // const imageUrl = Object.values(eventDetail.EventImages).find((image) => image.preview === 1).url;
    let imageUrl="";
    if(eventData.EventImages.length > 0){
        imageUrl = eventData.EventImages.find((image) => image.preview == 1).url;
    }
    let isGroupCreator=false;
    // console.log("groupData36",groupData[eventData.groupId].organizerId);
    let organizerId = groupData[eventData.groupId].organizerId;
    if(sessionUser && organizerId === sessionUser.id){
        isGroupCreator=true;
    }
    return(
        <div>
            <img id="images" src={imageUrl} alt="event"/>
            <p>name  {name}</p>
            <p>startDate {startDate.slice(0, 10)}</p>
            <p>endDate  {endDate.slice(0, 10)}</p>
            {/* <p>{groupData}</p> */}
            {/* Action button shows if logged-in user is the creator of the event */}
            {sessionUser && isGroupCreator ? <DeleteModal
                                itemText="Delete"
                                modalComponent={<DeleteEventModal event={eventData}/>}
                                /> :null}
        </div>
    );
};

export default EventDetails;
