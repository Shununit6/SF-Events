import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
