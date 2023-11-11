import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
         <section>
             <ul>
                 {Object.values(groups).map((group) => (
                  <GroupIndexItem group={group} key={group.id}/>
                ))}
            </ul>
         </section>
        {/*
            <Link className="back-button new" to="/reports/new">
                New Report
            </Link>
            <button onClick={resetDatabase}>Reset the Database</button>
        </section>
      <ul>
        <li>
          <Route path="/groups/new" component={CreateGroupForm} />
          <Route exact path="/groups/:groupId" component={GroupShow} />
          <Route path="/groups/:groupId/edit" component={EditGroupForm} />
        </li> */}
      {/* </ul> */}
    </div>
  );}
}

export default Groups;
