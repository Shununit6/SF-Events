import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { eventDetails, getAllEvents } from "../../store/events";
import "./GroupEvents.css";
const GroupEvents = ({ group, event }) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    console.log("event", event);
    console.log("event", event.id);
    const eventData = useSelector((state) => state.events);
    console.log("group", group.Events);
    console.log("eventdata", eventData);
    useEffect(() => {
        // dispatch(getAllEvents()).then(()=>dispatch(eventDetails(event.id))).then(()=>setIsLoaded(true))
        dispatch(eventDetails(event.id)).then(()=>setIsLoaded(true))
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


    if(isLoaded){
    return (
            <div className="li-contents-flex">
                <Link id="linkwithtext" to={`/events/${id}`}  key={`${id}`}>
                <section>
                    <img id = "eventImage" src={imageUrl} alt="event"/>
                    <p>{startDate.slice(0,10)}</p>
                    <h1>{name}</h1>
                    <p>{location}</p>

                </section>
                </Link>
            </div>
    );}
};

export default GroupEvents;
