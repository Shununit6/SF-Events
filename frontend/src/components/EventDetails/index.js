// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
// import { eventDetails } from "../../store/events";

// const EventDetails = () => {
//     const dispatch = useDispatch();
//     let { eventId } = useParams();
//     eventId = parseInt(eventId);
//     const [isLoading, setIsLoading] = useState(true);
//     const eventDetail = useSelector((state) => state.events[eventId]);

//     useEffect(() => {
//         dispatch(eventDetails(eventId)).then(()=>setIsLoading(false))
//     }, [dispatch, eventId])


//     if (isLoading) {
//         return (<div>Loading...</div>);
//     }

//     const {id, groupId, venueId, name, type, startDate, endDate, previewImage} = eventDetail;
//     return(
//         <div>
//             <Link to={`/events/${eventId}`}></Link>
//             <p>id {id}</p>
//             <p>groupId {groupId}</p>
//             <p>venueId {venueId}</p>
//             <p>name  {name}</p>
//             <p>type  {type}</p>
//             <h1>startDate {startDate}</h1>
//             <p>endDate  {endDate}</p>
//             <p>previewImage  {previewImage}</p>
//         </div>
//     );
// };

// export default EventDetails;
