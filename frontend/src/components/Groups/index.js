import React, { useEffect} from 'react';
// import { NavLink } from 'react-router-dom';
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
         {/* <section> */}
             {/* <ul>
                 {Object.values(groups).map((report) => (
                    <ReportIndexItem report={report} key={report.id} />
                ))}
            </ul>
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
  );
}

export default Groups;

// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllReports } from "../store/reports";

// import ReportIndexItem from "./ReportIndexItem";
// import { resetDatabase } from "../mocks/storage";

// const ReportIndex = () => {
//     const reports = useSelector((state) => state.reports); // populate from Redux store
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getAllReports());
//     }, []);
//     /* **DO NOT CHANGE THE RETURN VALUE** */
//     return (
//         <section>
//             <ul>
//                 {Object.values(reports).map((report) => (
//                     <ReportIndexItem report={report} key={report.id} />
//                 ))}
//             </ul>
//             <Link className="back-button new" to="/reports/new">
//                 New Report
//             </Link>
//             <button onClick={resetDatabase}>Reset the Database</button>
//         </section>
//     );
// };

// export default ReportIndex;
