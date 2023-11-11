import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupDetails, getGroupIdEvents } from '../../store/groups';
import { Link } from 'react-router-dom';
import "./GroupIndexItem.css";
const GroupIndexItem = ({ group }) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const groupData = useSelector((state) => state.groups[group.id]);
    useEffect(() => {
        dispatch(groupDetails(group.id)).then(()=>dispatch(getGroupIdEvents(group.id))).then(()=>setIsLoaded(true))
    }, [dispatch, group.id])

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
    let numOfEvents;
    if(!groupData.events){
        numOfEvents = 0;
    }else{numOfEvents = Object.values(groupData.events).length;}
    const imageUrl = Object.values(groupData.GroupImages)[0].url;
    console.log("groupData", groupData);
    if(isLoaded){
    return (
        <li>
            <div className="li-contents-flex">
            <Link id="linkwithtext" to={`/groups/${id}`}  key={`${id}`}>
                <section>
                    <img id = "groupImage" src={imageUrl} alt="group"/>
                    {/* <img src={`https://picsum.photos/200/300?random=${id}`}/> */}
                    <p>{name}</p>
                    <p>{city}, {state}</p>
                    <p>{about}</p>
                    <p>{isPrivate}</p>
                    <p>{numOfEvents} events</p>
                </section>
            </Link>
            </div>
        </li>
    );
    }
};

export default GroupIndexItem;
