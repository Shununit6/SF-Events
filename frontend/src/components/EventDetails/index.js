import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { eventDetails } from "../../store/events";

const EventDetails = () => {
    const dispatch = useDispatch();
    let { eventId } = useParams();
    eventId = parseInt(eventId);
    const [isLoading, setIsLoading] = useState(true);
    const eventDetail = useSelector((state) => state.events[eventId]);

    useEffect(() => {
        dispatch(eventDetails(eventId)).then(()=>setIsLoading(false))
    }, [dispatch, eventId])


    if (isLoading) {
        return (<div>Loading...</div>);
    }

    const {id, organizerId, name, about, type, city, state, createdAt, updatedAt} = eventDetail;
    const isPrivate = eventDetail.private;
    return(
        <div>
            <Link to={`/events/${eventId}`}></Link>
            <p>id: {id}</p>
            <p>organizerId: {organizerId}</p>
            <p>name {name}</p>
            <p>about  {about}</p>
            <p>type  {type}</p>
            <h1>private {isPrivate}</h1>
            <p>city  {city}</p>
            <p>state  {state}</p>
            <p>createdAt  {createdAt}</p>
            <p>"updatedAt  {updatedAt}</p>
        </div>
    );
};

export default eventDetails;
