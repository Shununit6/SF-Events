// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getGroupIdEvents } from '../../store/groups';
import { Link } from 'react-router-dom';
import "./GroupIndexItem.css";
const GroupIndexItem = ({ group }) => {
    // const dispatch = useDispatch();

    // const [isLoaded, setIsLoaded] = useState(false);
    // const returnState = useSelector((state) => state);
    // // console.log("group", group.id);
    // useEffect(() => {
    //     dispatch(getGroupIdEvents(group.id)).then(()=>setIsLoaded(true))
    // }, [dispatch])
    // if(!isLoaded) {
    //     return (<div>Loading...</div>);
    // }
    const {id, name, about, city, state } = group;
    let isPrivate;
    if(group.private){
        isPrivate = "Private";
    }else{
        isPrivate = "Public";
    }
    // if(isLoaded){
    return (
        <li>
            <div className="li-contents-flex">
            <Link id="linkwithtext" to={`/groups/${id}`}  key={`${id}`}>
                <img src={`https://picsum.photos/200/300?random=${id}`}/>
                <p>{name}</p>
                <p>{city}, {state}</p>
                <p>{about}</p>
                <p>{isPrivate}</p>
            </Link>
            </div>
        </li>
    );
// }
};

export default GroupIndexItem;
