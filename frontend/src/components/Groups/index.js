import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllGroups} from '../../store/groups';
import GroupIndexItem from '../GroupIndexItem';
import "./groups.css";

function Groups() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const groups = useSelector((state) => state.groups);
    useEffect(()=>{
      dispatch(getAllGroups()).then(()=>setIsLoaded(true))
    }, [dispatch]);

  if (!isLoaded) {
    return (<div>Loading...</div>);
  }
  // console.log(groups);
  if(isLoaded){
  return (
    <div id="groupslistgrid">
        <h2><Link id="eventsIsNotActive" to="/events" > Events </Link>
        <Link id="groupsIsActive" to="/groups" > Groups </Link>
        </h2>
         <p>Groups in San Francisco Events</p>
         <div id="viewallgroups">
            {Object.values(groups).map((group, index) => (
                  <GroupIndexItem group={group} key={index}/>
            ))}
         </div>
    </div>
  );}
}

export default Groups;
