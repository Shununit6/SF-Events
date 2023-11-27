import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupDetails, getGroupIdEvents } from '../../store/groups';
import { Link, Redirect } from 'react-router-dom';
import "./GroupIndexItem.css";
const GroupIndexItem = ({ group }) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const groupData = useSelector((state) => state.groups[group.id]);
    useEffect(() => {
        dispatch(groupDetails(group.id)).then(()=>dispatch(getGroupIdEvents(group.id))).then(()=>setIsLoaded(true))
    }, [dispatch, group.id])

    // if(isLoaded && !groupData){
    //     return (<Redirect to="/groups"/>);
    // }

    if(!isLoaded) {
        return (<div>Loading...</div>);
    }

    const {id, name, about, city, state} = groupData;

    let isPrivate;
    if(group.private){
        isPrivate = "Private";
    }else{
        isPrivate = "Public";
    }
    let imageUrl ="";
    if(Object.values(group.GroupImages)){
        imageUrl = Object.values(group.GroupImages).find((image) => image.preview === 1 || image.preview === true).url;
    }
    // console.log("groupData", groupData);
    if(isLoaded){
    return (
        <Link id="grouplinkwithtext" to={`/groups/${id}`}  key={`${id}`}>
        <hr />
        <div id="groupgrid1">
            <div id="groupitem1">
                <img id ="groupImage" src={imageUrl} alt="group"/>
            </div>
            <div id ="groupitem2">
            <h1>{name}</h1>
                <p>{city}, {state}</p>
                <p>{about}</p>
                <p>{Object.values(groupData.Events|| {}).length} events ·  {isPrivate}</p>
            </div>
        </div>
        </Link>


    );
    }
};

export default GroupIndexItem;
