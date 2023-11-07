import React, { useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as groupsActions from '../../store/groups';

function Groups() {
    const dispatch = useDispatch();
    useEffect(()=>{
    //   dispatch(groupsReducer);
    console.log(dispatch(groupsActions.getAllGroups()));
    }, [dispatch]);
  return (
    <div>
      <ul>
        <li>
          <NavLink exact to="/groups">Groups</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Groups;
