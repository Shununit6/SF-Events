import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { eventDetails, getAllEvents } from "../../store/events";
import "./EventIndexItem.css";
const EventIndexItem = ({ event }) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    // console.log("event", event);
    // console.log("event", event.id);
    const eventData = useSelector((state) => state.events);
    const groupData = useSelector((state) => state.groups);

    useEffect(() => {
        // dispatch(getAllEvents()).then(()=>dispatch(eventDetails(event.id))).then(()=>setIsLoaded(true))
        dispatch(eventDetails(event.id)).then(()=>setIsLoaded(true))
    }, [dispatch, event.id, groupData])
    // console.log("eventData", eventData);
    if(!isLoaded) {
        return (<div>Loading...</div>);
    }
    const {name, id, startDate, Venue, description} = event;
    let city = Venue.city;
    let state = Venue.state;
    // console.log(city, state);
    let location = city + ', ' + state;
    // let location = {`${event.Venue.city}`, `${event.Venue.state}`};

    let imageUrl="";
    if(eventData[event.id].EventImages.length > 0){
        imageUrl = Object.values(eventData[event.id].EventImages).find((image) => image.preview == 1).url;
    }
    // console.log("eventData.EventImages.length", Object.values(eventData[event.id].EventImages).find((image) => image.preview == 1).url);
    // let imageUrl="";
    // if(eventData.EventImages.length > 0){
    //     imageUrl = eventData.EventImages.find((image) => image.preview == 1).url;
    // }
    // console.log("groupdata", eventData);
    // console.log("groupdataobjval", (Object.values(groupData)));
    // let g = Object.values(groupData);
    // let e = {};
    // let each = g.map((g)=>g.Events);
    // console.log(e);

    if(isLoaded){
    return (
            <div className="li-contents-flex">
                <Link id="linkwithtext" to={`/events/${id}`}  key={`${id}`}>
                <hr />
                <div id="grid">
                    <div id="item9">
                        <img id = "eventImage" src={imageUrl} alt="event"/>
                    </div>
                    <div id="item10">
                        <p>{startDate.slice(0,10)}</p>
                        <h1>{name}</h1>
                        <p>{location}</p>
                    </div>
                    <div id="item11">
                        <p>{description}</p>
                    </div>
                </div>
                </Link>
            </div>
    );}
};

export default EventIndexItem;
