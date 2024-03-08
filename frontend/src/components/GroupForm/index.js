import { useState, useEffect } from "react";
import { useHistory,} from "react-router-dom"; //useParams,
import { useDispatch, useSelector} from "react-redux"; //useSelector
import { createGroup, createGroupImage, updateGroup,} from "../../store/groups";//groupDetails, updateGroupImages
import "./GroupForm.css";

const GroupForm = ({ group, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const groups = useSelector(state => state.groups);
    let [city, setCity] = useState(group?.city);
    let [state, setState] = useState(group?.state);
    let locationState;
    if(city || state && formType === "Update Group"){
        locationState=`${city}, ${state}`;
        // [location, setLocation] = useState(`${city}, ${state}`);
    }else{
        locationState="";
    }
    let [location, setLocation] = useState(locationState);
    let [name, setName] = useState(group?.name);
    let [about, setAbout] = useState(group?.about);
    let [type, setType] = useState(group?.type);
    let privateState;
    let organizerId = sessionUser.id;
    if(group?.private === 1){
        privateState="Private";
    }else if(group?.private === 0){
        privateState="Public";
    }else{
        privateState="";
    }
    let [isPrivate, setIsPrivate] = useState(privateState);

    let imageState;
    let groupImageUrl = "";
    if(formType === "Update Group"){
        if(group.GroupImages.length){
            groupImageUrl = Object.values(group.GroupImages).find((image) => image.preview === 1 || image.preview === true).url;
        }
        imageState = groupImageUrl;
    }else{
        imageState ="";
    }
    let [imageUrl, setImageUrl] = useState(imageState);

    let isUpdate = false;
    if(formType === "Update Group"){
        isUpdate = true;
    }

    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = { location: [], name: [], about: [],type:[], isPrivate:[], imageUrl:[] };
        if (!location.length) errors["location"].push("Location is required");
        if (!name.length) errors["name"].push("Name is required");
        if (name.length > 60) errors["name"].push("Name must be 60 characters or less");
        if (about.length < 50) errors["about"].push("Description needs 50 or more characters");
        if (about.length > 600) errors["about"].push("Description must be 600 characters or less");
        if (!type.length) errors["type"].push("Group Type is required");
        if (!isPrivate.length) errors["isPrivate"].push("Visibility Type is required");
        // .png, .jpg, or .jpeg
        if(!imageUrl.endsWith('.png') && !imageUrl.endsWith('.jpg') && !imageUrl.endsWith('.jpeg'))
        errors["imageUrl"].push("Image URL must end in .png, .jpg, or .jpeg");
        if(formType === "Create Group" || formType === "Update Group"){
            city = location.split(",")[0];
            state = location.split(",")[1];
            if(!city){
                errors["location"].push("City is required");
            }
            if(!state){
                errors["location"].push("State is required");
            }
        }
        setValidationErrors(errors);
    }, [location, name, about, type, isPrivate, imageUrl]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        // console.log(location);
        city = location.split(",")[0];
        state = location.split(",")[1];
        // console.log(validationErrors);
        if(isPrivate === "Private"){
            isPrivate = 1;
        }else{
            isPrivate = 0;
        }
        group = { ...group, city, state, name, about, type, private:isPrivate, organizerId};
        // console.log("78group", group.organizerId);
        // console.log("user.id", organizerId);
        let newGroup;
        let errorCount = validationErrors.location.length + validationErrors.name.length
        + validationErrors.about.length + validationErrors.type.length + validationErrors.isPrivate.length
        + validationErrors.imageUrl.length;
        // console.log(errorCount);
        if (errorCount > 0){
            // console.log("has errors");
            }else{
                // console.log("no errors");
                if (formType === "Update Group") {
                    if(sessionUser && Object.values(groups)[0].organizerId !== sessionUser.id){
                        history.push(`/`);
                        return;
                    }
                    // {console.log("isprivate", isPrivate)}
                    // console.log("updateimageurl",imageUrl);
                    group.imageUrl = imageUrl;
                    // console.log(group);
                    newGroup = await dispatch(updateGroup(group));
                    //uncomment to edit groupimages
                    // newGroup = await dispatch(updateGroupImages(group, imageUrl));
                } else {
                    newGroup = await dispatch(createGroup(group));
                    let GroupImages={url: imageUrl, preview: 1};
                    await dispatch(createGroupImage(GroupImages, newGroup.id));
                }
                if (newGroup.id) {
                    // console.log("newGroup.id", newGroup.id);
                    history.push(`/groups/${newGroup.id}`);
                } else {
                    const { validationErrors } = await newGroup.json();
                    setValidationErrors(validationErrors);
                }
                // console.log(newGroup);

                setCity('');
                setState('');
                setLocation('');
                setName('');
                setAbout('');
                setType('');
                setIsPrivate('');
                setImageUrl('')
                setValidationErrors({});
                setHasSubmitted(false);
            }
        // const button = document.getElementById("groupButton");
        // if (Object.values(validationErrors).length){
        //     button.disabled = true;
        // }else{
        //     button.disabled = false;
        // }
    };

//     /* **DO NOT CHANGE THE RETURN VALUE** */
    return (
        <form onSubmit={handleSubmit}>
            {/* {console.log(validationErrors)} */}
            <div id="groupformcreateupdate">
                <div id="titlecreateupdategroupform">
                    {!isUpdate && <h2>Start a New Group</h2>}
                    {isUpdate && <h2>Update your Group</h2>}
                </div>
            <h2>We'll walk you through a few steps to build your local community</h2>
            <div><hr/>
            <h2>First, set your group's location.</h2>
            <p>San Francisco Events groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.</p>
            </div>
            <div>
                <label>
                    <input
                        id='groupformlocation'
                        type="text"
                        placeholder="City, STATE"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                    />
                    {hasSubmitted &&
                        validationErrors.location.length > 0 &&
                        validationErrors.location.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                <hr/>
                <h2>What will your group's name be?</h2>
                <p>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</p>
            </div>
            <div>
                <label>
                    <input
                        id='groupformname'
                        type="text"
                        placeholder="What is your group name?"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    {hasSubmitted &&
                        validationErrors.name.length > 0 &&
                        validationErrors.name.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                <hr/>
                <h2>Now describe the purpose of your group.</h2>
                <p>People will see this when we promote your group, but you'll be able to add to it later, too.</p>
                <p>
                1. What's the purpose of the group?<br></br>
                2. Who should join?<br></br>
                3. What will you do at your events?
                </p>
            </div>
            <div>
                <label>
                    <textarea
                        id='groupformabout'
                        value={about}
                        placeholder="Please write at least 50 characters"
                        onChange={(e) => setAbout(e.target.value)}
                    />
                    {hasSubmitted &&
                        validationErrors.about.length > 0 &&
                        validationErrors.about.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                <hr/>
                <h2>Final steps...</h2>
            </div>
            <div>
                <label>
                    <p>Is this an in-person or online group?</p>
                    <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value='' disabled>(select one)</option>
                        <option value="In person">In person</option>
                        <option value="Online">Online</option>
                    </select>
                    {hasSubmitted &&
                        validationErrors.type.length > 0 &&
                        validationErrors.type.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                <label>
                    <p>Is this group private or public?</p>
                    <select id="groupformisPrivate" value={isPrivate} onChange={(e) => setIsPrivate(e.target.value)}>
                        <option value='' disabled>(select one)</option>
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                    </select>
                    {hasSubmitted &&
                        validationErrors.isPrivate.length > 0 &&
                        validationErrors.isPrivate.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                <label><p>Please add an image URL for your group below:</p>
                    <textarea
                        id='groupformimageUrl'
                        value={imageUrl}
                        placeholder="Image Url"
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    {hasSubmitted &&
                        validationErrors.imageUrl.length > 0 &&
                        validationErrors.imageUrl.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div><hr/></div>
            <button type="submit" id="GroupCreateUpdateButton" >{formType}</button>
            </div>
        </form>
    );
};

export default GroupForm;
