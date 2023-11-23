import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../store/events';
import { getAllGroups } from '../../store/groups';
import EventIndexItem from '../EventIndexItem';
import "./events.css";
function Events() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const events = useSelector((state) => state.events);
    const groups = useSelector((state) => state.groups);
    let groupIdsArr = Object.values(groups).map((group)=>{if(group.id){ return group.id}})
    let validEvents = Object.values(events).map((event)=>{if(groupIdsArr.includes(event.groupId)){return event}else{return 0}});
    let validEventsArr=[];
    validEvents.forEach((event)=>{if(event){validEventsArr.push(event)}});
    useEffect(()=>{
      dispatch(getAllEvents()).then(()=>dispatch(getAllGroups())).then(()=>setIsLoaded(true))
    }, [dispatch]);

  if (!isLoaded) {
    return (<div>Loading...</div>);
  }

  if(isLoaded){
  return (
    <div>
         <h2><Link id="eventsIsActive"to="/events" > Events </Link>{"\t"}
         <Link id="groupsIsNotActive"to="/groups" > Groups </Link></h2>
         <p>Events in San Francisco Events</p>
         <section>
             <ul>
                 {Object.values(validEventsArr).map((event, index) => (
                  <EventIndexItem event={event} key={index}/>
                ))}
            </ul>
         </section>
    </div>
  );}
}

export default Events;
