// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { getAllEvents } from '../../store/events';
// import EventIndexItem from '../EventIndexItem';
// function Events() {
//     const dispatch = useDispatch();
//     const [isLoaded, setIsLoaded] = useState(false);
//     const events = useSelector((state) => state.events);

//     useEffect(()=>{
//       dispatch(getAllEvents()).then(()=>setIsLoaded(true))
//     }, [dispatch]);

//   if (!isLoaded) {
//     return (<div>Loading...</div>);
//   }

//   if(isLoaded){
//   return (
//     <div>
//          <section>
//              <ul>
//                  {Object.values(events).map((event) => (
//                   <Link to={`/events/${event.id}`}>{<EventIndexItem event={event} key={event.id}/>}</Link>
//                 ))}
//             </ul>
//          </section>
//         {/*
//             <Link className="back-button new" to="/reports/new">
//                 New Report
//             </Link>
//             <button onClick={resetDatabase}>Reset the Database</button>
//         </section>
//       <ul>
//         <li>
//           <Route path="/groups/new" component={CreateGroupForm} />
//           <Route exact path="/groups/:groupId" component={GroupShow} />
//           <Route path="/groups/:groupId/edit" component={EditGroupForm} />
//         </li> */}
//       {/* </ul> */}
//     </div>
//   );}
// }

// export default Events;
