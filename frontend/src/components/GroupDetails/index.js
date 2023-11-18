import { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import { groupDetails, getGroupIdEvents } from "../../store/groups";
import "./GroupDetails.css";
import GroupEvents from "../GroupEvents";
import DeleteModal from '../Navigation/DeleteModel';
import DeleteGroupModal from "../DeleteGroupModal";
const GroupDetails = () => {
    const dispatch = useDispatch();
    let { groupId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const groupData = useSelector((state) => state.groups[groupId]);

    useEffect(() => {
        dispatch(groupDetails(groupId)).then(()=>dispatch(getGroupIdEvents(groupId))).then(()=>setIsLoaded(true))
    }, [dispatch, groupId])
    if(isLoaded && !groupData){
        return (<Redirect to="/groups"/>);
    }
    if(!isLoaded) {
        return (<div>Loading...</div>);
    }
    // const {id, organizerId, name, about, type, city, state, createdAt, updatedAt} = groupData;
    const { name, about, city, state, } = groupData;
    let firstName=" ", lastName=" ";
    let isGroupCreator=false;
    if(groupData.Organizer){
        ({firstName, lastName} = groupData.Organizer);
    }
    if(sessionUser && groupData && groupData.organizerId === sessionUser.id){
        isGroupCreator=true;
        // ({firstName, lastName} = sessionUser);
    }
    // console.log(groupData.Organizer);
    // console.log(groupData.organizerId);
    // console.log(sessionUser.firstName, sessionUser.lastName)
    // firstName(pin):"Callie"
    let isPrivate;
    if(groupData.private){
        isPrivate = "Private";
    }else{
        isPrivate = "Public";
    }
    const imageUrl = Object.values(groupData.GroupImages).find((image) => image.preview === 1).url;
    // console.log("Object.values(groupData.GroupImages)", Object.values(groupData.GroupImages));

    let pastEvents = [], upcomingEvents = [];
    if(groupData.Events){
    let array = Object.values(groupData.Events);
    // console.log("array", array);
    array.sort(function(a,b){
    return new Date(b.startDate) - new Date(a.startDate);
    });
    // console.log("array", array);
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
    // const alertDeleteGroup = () =>{

    //     return alert("Feature Coming Soon...");
    // }
    const alertJoinThisGroup = () =>{
        return alert("Feature Coming Soon...");
    }

    if(isLoaded){
        return(
            <div id="items">
                {/* <div id="items-2"></div> */}
                <div id="item1">
                    <Link to={"/groups"}> <p>Groups</p> </Link>
                </div>
                <div id="item2">
                    <img id="images" src={imageUrl} alt="group"/>
                </div>
                <div id="item3">
                    <h1>{name}</h1>
                    <p>{city}, {state}</p>
                    <p>{Object.values(groupData.Events|| {}).length} events · {isPrivate}</p>
                    <p>Organized by {firstName} {lastName}</p>
                </div>
                    <div id="item4" className="one-button-container">
                        {sessionUser && !isGroupCreator ? <button onClick={alertJoinThisGroup}>Join this group</button> : null}
                    </div>
                    {sessionUser && isGroupCreator ?
                        <div id="item4" className="buttons-container">
                        <Link to={`/groups/${groupId}/events/new`}>
                            <button>Create event</button>
                        </Link>
                        <Link to={`/groups/${groupId}/edit`}>
                            <button >Update</button>
                        </Link>

                        <DeleteModal
                                itemText="Delete"
                                modalComponent={<DeleteGroupModal group={groupData}/>}
                                />

                        </div>
                        : null}
                <div id="item5">
                <h1>Organizer</h1>
                <p>{firstName} {lastName}</p>
                <h1>What we're about</h1>
                <p>{about}</p>
                {upcomingEvents.length ?
                <div>
                <h1>Upcoming Events({upcomingEvents.length})</h1>
                <section>
                    {upcomingEvents.map((upcomingEvent)=>{
                        return <GroupEvents group={groupData} event={upcomingEvent} key={upcomingEvent.id}/>
                    })}
                </section>
                </div>
                : null}
                {pastEvents.length ?
                <div>
                    <h1>Past Events({pastEvents.length})</h1>
                    <section>
                        {pastEvents.map((pastEvent)=>{
                            return <GroupEvents group={groupData} event={pastEvent} key={pastEvent.id}/>
                        })}
                    </section>
                </div>
                : null}
                </div>
            </div>
        );
    }

};

export default GroupDetails;
