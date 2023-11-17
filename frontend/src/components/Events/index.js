import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../store/events';
import EventIndexItem from '../EventIndexItem';
import "./events.css";
function Events() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const events = useSelector((state) => state.events);
    useEffect(()=>{
      dispatch(getAllEvents()).then(()=>setIsLoaded(true))
    }, [dispatch]);

  if (!isLoaded) {
    return (<div>Loading...</div>);
  }

  if(isLoaded){
  return (
    <div>
         <Link to="/events" > Events </Link>
         <Link to="/groups" > Groups </Link>
         <h2>Events in Meetup</h2>
         <section>
             <ul>
                 {Object.values(events).map((event) => (
                  <EventIndexItem event={event} key={event.id}/>
                ))}
            </ul>
         </section>
    </div>
  );}
}

export default Events;
