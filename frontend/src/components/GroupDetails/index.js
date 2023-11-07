import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { loadGroupDetails } from "../../store/groups";

const GroupDetails = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const groupState = useSelector((state) => state.groups);
    console.log(groupState);
    // const groupDetail = groupState[groupId];
    // const {organizerId, name, about, type, city, state, createdAt, updatedAt} = groupDetail;
    useEffect(() => {
        dispatch(loadGroupDetails(groupId))
    }, [dispatch, groupId])

    // if (!groupDetail) {
    //     return <div>Loading...</div>
    // }

    // return(
    //     <div>
    //         {/* <h1>{id}</h1> */}
    //         <h1>{organizerId}</h1>
    //         <h1>{name}</h1>
    //         <h1>{about}</h1>
    //         <h1>{type}</h1>
    //         {/* <h1>{private}</h1> */}
    //         <h1>{city}</h1>
    //         <h1>{state}</h1>
    //         <h1>{createdAt}</h1>
    //         <h1>{updatedAt}</h1>
    //     </div>
    // );
};

export default GroupDetails;
