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

    const totalLaneCount = Math.ceil(about.length/59);
    let groupAboutArr=[];
    for(let i = 0; i <= totalLaneCount+1; i++){
        let j = 59;
        groupAboutArr.push(about.slice(j*i, j*i+59)+"\n");
        j += 59;
    };

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
    const isValidUrl = urlString => {
        try {
            return Boolean(new URL(urlString));
        }
        catch(e){
            return false;
        }
    }

    // console.log(isValidUrl(imageUrl))
    if(!isValidUrl(imageUrl)){
        imageUrl="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
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
                <p>{groupAboutArr}</p>
                <p>{Object.values(groupData.Events|| {}).length} events ·  {isPrivate}</p>
            </div>
        </div>
        </Link>


    );
    }
};

export default GroupIndexItem;
