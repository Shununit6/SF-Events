import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { eventDetails, getAllEvents } from "../../store/events";
import "./GroupEvents.css";
const GroupEvents = ({ event }) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    // console.log("event", event);
    // console.log("event", event.id);
    const eventData = useSelector((state) => state.events);
    // console.log("group", group.Events);
    // console.log("eventdata", eventData);
    useEffect(() => {
        dispatch(getAllEvents()).then(()=>dispatch(eventDetails(event.id))).then(()=>setIsLoaded(true))
        // dispatch(eventDetails(event.id)).then(()=>setIsLoaded(true))
    }, [dispatch, event.id])
    // console.log("eventData", eventData);
    if(!isLoaded) {
        return (<div>Loading...</div>);
    }
    const {name, id, startDate, Venue } = event;
    let city = Venue.city;
    let state = Venue.state;
    // console.log(city, state);
    let location = city + ', ' + state;
    // console.log(startDate);
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

    const eventDescription = eventData[id].description;
    const totalLaneCount = Math.ceil(eventDescription.length/87);
    let eventDescriptionArr=[];
    for(let i = 0; i <= totalLaneCount+1; i++){
        let j = 87;
        eventDescriptionArr.push(eventDescription.slice(j*i, j*i+87)+"\n");
        j += 87;
    };

    let imageUrl="";
    if(eventData[event.id].EventImages.length > 0){
        imageUrl = Object.values(eventData[event.id].EventImages).find((image) => image.preview === 1 || image.preview === true).url;
    }

    if(isLoaded){
    return (
            <div className="groupeventslicontentsflex">
                <Link id="groupeventslinkwithtext" to={`/events/${id}`}  key={`${id}`}>
                <div id="grid11">
                    <div id="item6">
                        <img id = "eventImage" src={imageUrl} alt="event"/>
                    </div>
                    <div id="item7">
                        <p id="formattedPstStartDate">{formattedPstStartDate}</p>
                        <h1>{name}</h1>
                        <p>{location}</p>
                    </div>
                    <div id="item8">
                        <p>{eventDescriptionArr}</p>
                    </div>
                </div>
                </Link>
            </div>
    );}
};

export default GroupEvents;
