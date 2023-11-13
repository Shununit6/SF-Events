import { useEffect, useState } from "react";
import { useParams, Link} from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import { groupDetails, getGroupIdEvents } from "../../store/groups";
import { deleteGroup } from "../../store/groups";
import "./GroupDetails.css";
import GroupEvents from "../GroupEvents";
const GroupDetails = () => {
    const dispatch = useDispatch();
    let { groupId } = useParams();
    // groupId = parseInt(groupId);
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const groupData = useSelector((state) => state.groups[groupId]);
    // return ()=>{setIsLoaded(false)}

    useEffect(() => {
        dispatch(groupDetails(groupId)).then(()=>dispatch(getGroupIdEvents(groupId))).then(()=>setIsLoaded(true))
    }, [dispatch, groupId])

    if(!isLoaded) {
        return (<div>Loading...</div>);
    }
    // const {id, organizerId, name, about, type, city, state, createdAt, updatedAt} = groupData;
    const { name, about, city, state } = groupData;
    let isPrivate;
    if(groupData.private){
        isPrivate = "Private";
    }else{
        isPrivate = "Public";
    }

    const imageUrl = Object.values(groupData.GroupImages)[0].url;
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteGroup(groupId));
    };

    let pastEvents = [], upcomingEvents = [];
    if(groupData.events){
    let array = Object.values(groupData.events);
    console.log("array", array);
    array.sort(function(a,b){
    return new Date(b.startDate) - new Date(a.startDate);
    });
    console.log("array", array);
    let currDate = new Date();
    array.forEach((ele, index)=>{
        console.log(new Date(ele.startDate)-new Date(currDate));
        if((new Date(ele.startDate)-new Date(currDate)) < 0){
            pastEvents.push(ele);
        }else{
            upcomingEvents.unshift(ele);
        }});}

    // let nomalizedPastEvents = {};
    // pastEvents.forEach((ele, index)=>{nomalizedPastEvents[index]=ele});
    // let nomalizedUpComingEvents = {};
    // upcomingEvents.forEach((ele, index)=>{nomalizedUpComingEvents[index+1]=ele});
    // console.log("pastEvents", pastEvents[0], pastEvents.name);
    // console.log(upcomingEvents);
    // console.log(Object.values(nomalizedPastEvents).forEach((pastEvent)=>{
    //     console.log(pastEvent.startDate);
    // }));

    if(isLoaded){
        return(
            <div>
                {/* <Link to={`/groups/${groupId}`}></Link> */}
                <img id="images" src={imageUrl} alt="group"/>
                {/* <img alt="random group"src={`https://picsum.photos/200/300?random=${groupId}`}/> */}
                <p>{name}</p>
                <p>{city}, {state}</p>
                {console.log(groupData.events)}
                <p>{Object.values(groupData.events|| {}).length} events</p>
                <p>{isPrivate}</p>
                <p>organized by firstName lastName</p>
                {/* {items.length
          ? items.map((item) => <li key={item.id}>{item.name}</li>)
          : null} */}
                <div className="one-button-container">
                    {!sessionUser ? <button >Join this group</button> : null}
                    {/* <button >Join this group</button> */}
                </div>
                {sessionUser ?
                    <div className="buttons-container">
                    <button >Create event</button>
                    <Link to={`/groups/${groupId}/edit`}>
                        <button >Update</button>
                    </Link>
                    <button >Delete</button>
                    </div>
                    : null}

                <h1>Organizer</h1>
                <h1>What we're about</h1>
                <p>{about}</p>
                {upcomingEvents.length ?
                <div>
                <h1>Upcoming Events({upcomingEvents.length})</h1>
                <section>
                <ul>
                    <p>
                    {upcomingEvents.map((ele)=>{
                        return ele.startDate;
                    })}</p>
                         <p>{upcomingEvents[0].startDate}</p>
                         <p>{upcomingEvents[0].name}</p>
                         <p>{upcomingEvents[0].location}</p>
                </ul>
                </section>
                </div>
                : null}
                {pastEvents.length ?
                <div>
                    <h1>Past Events({pastEvents.length})</h1>
                    <section>
                    <ul>
                        {pastEvents.map((pastEvent)=>{
                            return <GroupEvents event={pastEvent} key={pastEvent.id}/>
                        })}
                    </ul>
                    </section>
                </div>
                : null}
            </div>
        );
    }

};

export default GroupDetails;
