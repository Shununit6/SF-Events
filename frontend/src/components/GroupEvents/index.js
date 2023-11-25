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
    const {name, id, startDate, Venue, endDate} = event;
    let city = Venue.city;
    let state = Venue.state;
    // console.log(city, state);
    let location = city + ', ' + state;
    let startTime = startDate.slice(11,13);
    // if(parseInt(startTime) > 12){
    //     startTime=parseInt(startTime)-12+startDate.slice(13,16)+"pm";
    // }else{
    //     startTime=startDate.slice(11,16)+"am";
    // }
    const mystartDate = new Date(startDate);
    const pststartDate = mystartDate.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles"
    });
    console.log(pststartDate);

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
                        {/* <p>{startDate.slice(0,10)}{" · "}{parseInt(startTime)-8}{startDate.slice(11,13)}{startDate.slice(13,16)}</p> */}
                         {/* <p>{endDate.slice(0,10)}{" · "}{endDate.slice(11,13)}{endDate.slice(13,16)}</p> */}
                        <p>{pststartDate}</p>
                        <p>{startDate.toString()}</p>
                        <p>{endDate.toString()}</p>
                        <h1>{name}</h1>
                        <p>{location}</p>
                    </div>
                    <div id="item8">
                        <p>{eventData[id].description}</p>
                    </div>
                </div>
                </Link>
            </div>
    );}
};

export default GroupEvents;
