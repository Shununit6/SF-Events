// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {  } from '../../store/events';
// import { Link } from 'react-router-dom';

// const EventIndexItem = ({ event }) => {
//     const dispatch = useDispatch();
//     const [isLoaded, setIsLoaded] = useState(false);
//     const handleDelete = (e) => {
//         e.preventDefault();
//         dispatch(deleteEvent(event.id));
//     };

//     return (
//         <li>
//             <div className="li-contents-flex">
//                 <Link to={`/events/${event.id}`} key={`${event.id}`}>Event #{event.id}</Link>
//                 <div className="buttons-container">
//                     <Link
//                         className="edit-link"
//                         to={`/events/${event.id}/edit`}
//                     >
//                         Edit
//                     </Link>
//                     <button onClick={handleDelete}>Delete</button>
//                 </div>
//             </div>
//         </li>
//     );
// };

// export default EventIndexItem;
