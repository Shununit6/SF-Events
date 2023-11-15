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

  if(isLoaded){
  return (
    <div>
         <Link to="/events" > Events </Link>
         <Link to="/groups" > Groups </Link>
         <section>
             <ul>
                 {Object.values(groups).map((group) => (
                  <GroupIndexItem group={group} key={group.id}/>
                ))}
            </ul>
         </section>
    </div>
  );}
}

export default Groups;
