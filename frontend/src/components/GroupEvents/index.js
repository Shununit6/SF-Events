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
        dispatch(getAllEvents()).then(()=>dispatch(eventDetails(event.id))).then(()=>setIsLoaded(true))
    }, [dispatch, event.id])
    // console.log("eventData", eventData);
    if(!isLoaded) {
        return (<div>Loading...</div>);
    }
    const {name, id, startDate, location} = event;
    // console.log("specificeventimages", eventData[event.id].EventImages[0].url);
    const imageUrl = eventData[event.id].EventImages[0].url;
    if(isLoaded){
    return (
        <li>
            <div className="li-contents-flex">
                <Link id="linkwithtext" to={`/events/${id}`}  key={`${id}`}>
                <section>
                    <img id = "eventImage" src={imageUrl} alt="event"/>
                    {/* <img src={`https://picsum.photos/200/300?random=${id}`}/> */}
                    <p>{name}</p>
                    <p>{id}</p>
                    <p>{startDate.slice(0,10)}</p>
                    <p>{location}</p>
                </section>
                </Link>
            </div>
        </li>
    );}
};

export default GroupEvents;
