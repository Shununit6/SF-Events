import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { eventDetails, getAllEvents } from "../../store/events";
import "./GroupEvents.css";
const GroupEvents = ({ group, event }) => {
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
    const {name, id, startDate, location} = event;

    let imageUrl="";
    if(eventData[event.id].EventImages.length > 0){
        imageUrl = Object.values(eventData[event.id].EventImages).find((image) => image.preview == 1).url;
    }
    // console.log("eventData.EventImages.length", Object.values(eventData[event.id].EventImages).find((image) => image.preview == 1).url);
    // let imageUrl="";
    // if(eventData.EventImages.length > 0){
    //     imageUrl = eventData.EventImages.find((image) => image.preview == 1).url;
    // }

    // console.log("event", event);
    if(isLoaded){
    return (
            <div className="li-contents-flex">
                <Link id="linkwithtext" to={`/events/${id}`}  key={`${id}`}>
                <div id="grid11">
                    <div id="item6">
                        <img id = "eventImage" src={imageUrl} alt="event"/>
                    </div>
                    <div id="item7">
                        <p>{startDate.slice(0,10)}</p>
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
