import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { groupDetails } from "../../store/groups";

const GroupDetails = () => {
    const dispatch = useDispatch();
    let { groupId } = useParams();
    groupId = parseInt(groupId);
    const [isLoaded, setIsLoaded] = useState(false);
    const groupDetail = useSelector((state) => state.groups[groupId]);

    useEffect(() => {
        dispatch(groupDetails(groupId)).then(()=>setIsLoaded(true))
    }, [dispatch, groupId])

    const {id, organizerId, name, about, type, city, state, createdAt, updatedAt} = groupDetail;
    const isPrivate = groupDetail.private;

    if(!isLoaded) {
        return (<div>Loading...</div>);
    }

    if(isLoaded){
        return(
            <div>
                <Link to={`/groups/${groupId}`}></Link>
                <p>id: , {id}</p>
                <p>organizerId: , {organizerId}</p>
                <p>name , {name}</p>
                <p>about , {about}</p>
                <p>type , {type}</p>
                <h1>private {isPrivate}</h1>
                <p>city , {city}</p>
                <p>state , {state}</p>
                <p>createdAt , {createdAt}</p>
                <p>"updatedAt , {updatedAt}</p>
            </div>
        );
    }

};

export default GroupDetails;
