import { useState, useEffect } from "react";
import { useHistory, useParams, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createGroup, createGroupImage, updateGroup } from "../../store/groups";
// import { groupDetails } from "../../store/groups";


const GroupForm = ({ group, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { groupId } = useParams();
    groupId = parseInt(groupId);
    const groupData = useSelector((state) => state.groups[groupId]);
    let [city, setCity] = useState(groupData?.city);
    let [state, setState] = useState(groupData?.state);
    const [location, setLocation] = useState("");
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [type, setType] = useState("");
    let [isPrivate, setIsPrivate] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    // const [location, setLocation] = useState(groupData?.city, groupData?.state);
    // const [name, setName] = useState(groupData?.name);
    // const [about, setAbout] = useState(groupData?.about);
    // const [type, setType] = useState(groupData?.type);
    // const [isPrivate, setIsPrivate] = useState(groupData?.private);
    // const [imageUrl, setImageUrl] = useState("");
    // const [imageUrl, setImageUrl] = useState(Object.values(groupData?.GroupImages)[0].url);
    // const imageUrl = Object.values(groupData.GroupImages)[0].url;
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = { location: [], name: [], about: [],type:[], isPrivate:[], imageUrl:[] };
        if (!location.length) errors["location"].push("Location is required");
        if (!name.length) errors["name"].push("Name is required");
        if (about.length < 30) errors["about"].push("Description must be at least 30 characters long");
        if (!type.length) errors["type"].push("Group Type is required");
        if (!isPrivate.length) errors["isPrivate"].push("Visibility Type is required");
        // .png, .jpg, or .jpeg
        if(!imageUrl.endsWith('.png') && !imageUrl.endsWith('.jpg') && !imageUrl.endsWith('.jpeg'))
        errors["imageUrl"].push("Image URL must end in .png, .jpg, or .jpeg");
        setValidationErrors(errors);
    }, [location, name, about, type, isPrivate, imageUrl]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        console.log(location);
        city = location.split(",")[0];
        state = location.split(",")[1];
        // console.log(Object.values(groupData.GroupImages)[0].url;);
        if(isPrivate === "Private"){
            isPrivate = 1;
        }else{
            isPrivate = 0;
        }
        let GroupImages={url: imageUrl, preview: 1};
        console.log(GroupImages.url);
        console.log(GroupImages.preview);
        // group.GroupImages.url = imageUrl;
        group = { ...group, city, state, name, about, type, private:isPrivate,};
        // group.GroupImages = {["url":imageUrl]};
        console.log("62group", group);
        // GroupImages:{...GroupImages, url: imageUrl}
        // Object.values(groupData.GroupImages)[0].url
        let newGroup;
        let errorCount = validationErrors.location.length + validationErrors.name.length
        + validationErrors.about.length + validationErrors.type.length + validationErrors.isPrivate.length
        + validationErrors.imageUrl.length;
        console.log(errorCount);
        if (errorCount > 0){
            console.log("has errors");
            }else{
                console.log("no errors");
                if (formType === "Update Group") {
                    newGroup = await dispatch(updateGroup(group));
                } else {
                    newGroup = await dispatch(createGroup(group));
                    console.log(newGroup);
                    newGroup = await dispatch(createGroupImage(GroupImages, newGroup.id));
                }
                if (newGroup.id) {
                    history.push(`/groups/${newGroup.id}`);
                } else {
                    const { validationErrors } = await newGroup.json();
                    setValidationErrors(validationErrors);
                }
                console.log(newGroup);

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
            <h2>{formType}</h2>
            <h2>We'll walk you through a few steps to build your local community</h2>
            <h2>First, set your group's location.</h2>
            <p>Meetup groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.</p>
            <div>
                <label>
                    <input
                        id='location'
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
                <label>
                    What is your group name:
                    <input
                        id='name'
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
                <label>
                    <textarea
                        id='about'
                        value={about}
                        placeholder="Please write at least 30 characters"
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
                <label>
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
                    <select id="isPrivate" value={isPrivate} onChange={(e) => setIsPrivate(e.target.value)}>
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
                <label>Please add in image url for your group below:
                    <textarea
                        id='imageUrl'
                        value={imageUrl}
                        placeholder="image url"
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
            {/* disabled */}
            <button type="submit" id="GroupButton" >{formType}</button>
        </form>
    );
};

export default GroupForm;
