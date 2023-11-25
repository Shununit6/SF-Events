import { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { eventDetails } from "../../store/events";
import { getAllGroups, groupDetails} from "../../store/groups";
import DeleteModal from '../Navigation/DeleteModel';
import DeleteEventModal from "../DeleteEventModal";
import "./EventDetails.css";
const EventDetails = () => {
    const dispatch = useDispatch();
    let { eventId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [isLoading, setIsLoading] = useState(true);
    const eventData = useSelector((state) => state.events[eventId]);
    let groupId = 3;
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

    const {name, startDate, endDate, price, type, description} = eventData;
     //change groupId once eventData exists
    groupId = eventData.groupId;
    const groupName = groupData[groupId].name;

    let groupIsPrivate;
    if(groupData[groupId].private){
        groupIsPrivate = "Private";
    }else{
        groupIsPrivate = "Public";
    }

    const pststartDate = new Date(startDate).toLocaleDateString('en-US', {
        minute: '2-digit',
        hour:'2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: "America/Los_Angeles"
    });

    const formattedPstStartDate = pststartDate.slice(6,10) +"-"+ pststartDate.slice(0,2) + "-" + pststartDate.slice(3,5)
    +" · "+pststartDate.slice(12)+" PST";

    const pstendDate = new Date(endDate).toLocaleDateString('en-US', {
        minute: '2-digit',
        hour:'2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: "America/Los_Angeles"
    });

    const formattedPstEndDate = pstendDate.slice(6,10) +"-"+ pstendDate.slice(0,2) + "-" + pstendDate.slice(3,5)
    +" · "+pstendDate.slice(12)+" PST";

    const totalLaneCount = Math.ceil(description.length/87);
    let eventDescriptionArr=[];
    for(let i = 0; i <= totalLaneCount+1; i++){
        let j = 87;
        eventDescriptionArr.push(description.slice(j*i, j*i+87)+"\n");
        j += 87;
    };

    let imageUrl="";
    if(eventData.EventImages.length > 0){
        imageUrl = eventData.EventImages.find((image) => image.preview === 1|| image.preview === true).url;
    }

    let groupImageUrl="";
    if(groupData && groupData[groupId].GroupImages && groupData[groupId].GroupImages.length > 0){
        groupImageUrl = groupData[groupId].GroupImages.find((image) => image.preview === 1|| image.preview === true).url;
    }

    let isEventCreator=false;
    let organizerId = groupData[groupId].organizerId;
    if(sessionUser && organizerId === sessionUser.id){
        isEventCreator=true;
    }
    let firstName, lastName;
    if(groupData[groupId].Organizer){
        ({firstName, lastName} = groupData[groupId].Organizer);
    }

    if(!isLoading){
    return(
        <div id="eventdetails">
            <div id="eventdetailstitle">
                <Link to="/events" > Events </Link>
                <h1>{name}</h1>
                <p>Hosted by {firstName} {lastName}</p>
            </div>

            <div id="eventdetailsimage">
                <img id="images" src={imageUrl} alt="event"/>
            </div>
            <div id="eventdetailsgroup">
                <img id="eventgroupimage" src={groupImageUrl} alt="eventgroupimage"/>
                <div id="eventdetailsgrouptext">
                    <p>{groupName}</p>
                    <p>{groupIsPrivate}</p>
                </div>
            </div>
            <div id="eventdetailsinfo">
                <div id="eventdetailsclockdate">
                    <div id="eventdetailsfasfaclock">
                        <i className="fas fa-clock"/>
                    </div>
                    <div id="eventdetailsstartenddate">
                        <div>
                            START {formattedPstStartDate}
                        </div>
                        <div>
                            END {formattedPstEndDate}
                        </div>
                    </div>
                </div>
                <div>
                    {parseInt(price)===0 &&
                        <div id="freeevent">
                            <i className="fas fa-dollar-sign"/>{' '}FREE
                        </div>
                    }
                    {parseInt(price)!==0 &&
                        <div>
                            <i className="fas fa-dollar-sign"/>{' '}{price}
                        </div>
                    }
                </div>
                <div>
                    <i className="fas fa-map-pin"/>{' '}{type}
                </div>
                {/* Action button shows if logged-in user is the creator of the event */}
                {sessionUser && isEventCreator ? <DeleteModal
                                    itemText="Delete"
                                    modalComponent={<DeleteEventModal event={eventData}/>}
                                    /> :null}
            </div>
            <div id="eventdetailsdescription">
                <p>{eventDescriptionArr}</p>
            </div>
        </div>
    );}
};

export default EventDetails;
