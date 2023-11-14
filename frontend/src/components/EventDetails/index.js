import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { eventDetails } from "../../store/events";

const EventDetails = () => {
    const dispatch = useDispatch();
    let { eventId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [isLoading, setIsLoading] = useState(true);
    const eventData = useSelector((state) => state.events[eventId]);

    useEffect(() => {
        dispatch(eventDetails(eventId)).then(()=>setIsLoading(false))
    }, [dispatch, eventId])


    if (isLoading) {
        return (<div>Loading...</div>);
    }

    const {name, startDate, endDate} = eventData;
    // const imageUrl = Object.values(eventDetail.EventImages).find((image) => image.preview === 1).url;
    let imageUrl="";
    if(eventData.EventImages.length > 0){
        imageUrl = eventData.EventImages.find((image) => image.preview == 1).url;
    }
    return(
        <div>
            <img id="images" src={imageUrl} alt="event"/>
            <p>name  {name}</p>
            <p>startDate {startDate.slice(0, 10)}</p>
            <p>endDate  {endDate.slice(0, 10)}</p>
            {/* Action button shows if logged-in user is the creator of the event */}
            {sessionUser ? <button >Delete</button> :null}
        </div>
    );
};

export default EventDetails;
