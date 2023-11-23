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
  let pastEvents = [], upcomingEvents = [];
  validEvents.sort(function(a,b){
  return new Date(b.startDate) - new Date(a.startDate);
  });
  // console.log("array", validEvents);
  let currDate = new Date();
  validEvents.forEach((ele)=>{
        // console.log(new Date(ele.startDate)-new Date(currDate));
      if((new Date(ele.startDate)-new Date(currDate)) < 0){
        pastEvents.push(ele);
      }else{
        upcomingEvents.unshift(ele);
      }});

  let sortedEvents = upcomingEvents.concat(pastEvents);
  // console.log("sortedevents", sortedEvents);

  if(isLoaded){
  return (
    <div id="eventslistgrid">
         <h2><Link id="eventsIsActive"to="/events" > Events </Link>{"\t"}
         <Link id="groupsIsNotActive"to="/groups" > Groups </Link></h2>
         <p>Events in San Francisco Events</p>
         <div id="viewallevents">
            {Object.values(sortedEvents).map((event, index) => (
              <EventIndexItem event={event} key={index}/>
            ))}
         </div>
    </div>
  );}
}

export default Events;
