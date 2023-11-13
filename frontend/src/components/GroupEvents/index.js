import { Link } from "react-router-dom";

const GroupEvents = ({ event }) => {

    console.log("event", event);
    console.log("event", event.id);
    // const eventData = useSelector((state) => state.events);
    // console.log("eventdata", eventData);
    // useEffect(() => {
    //     dispatch(groupDetails(group.id)).then(()=>dispatch(getGroupIdEvents(group.id))).then(()=>setIsLoaded(true))
    // }, [dispatch, group.id])
    // console.log("eventData", eventData);
    // if(!isLoaded) {
    //     return (<div>Loading...</div>);
    // }
    const {name, id, startDate, location} = event;

    return (

        <li>
            <div className="li-contents-flex">
                <Link id="linkwithtext" to={`/events/${id}`}  key={`${id}`}>
                <section>
                    {/* <img id = "eventImage" src={imageUrl} alt="event"/> */}
                    {/* <img src={`https://picsum.photos/200/300?random=${id}`}/> */}
                    <p>{name}</p>
                    <p>{id}</p>
                    <p>{startDate}</p>
                    <p>{location}</p>
                </section>
                </Link>
            </div>
        </li>
    );
};

export default GroupEvents;
