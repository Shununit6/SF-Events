import { useState, useEffect } from "react";
import { useHistory,} from "react-router-dom"; //useParams,
import { useDispatch, useSelector } from "react-redux"; //useSelector
import { createGroupEvent, groupDetails } from "../../store/groups";


const EventForm = ({ group, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    let [name, setName] = useState("");
    let [type, setType] = useState("");
    let [capacity, setCapacity] = useState("");
    let [price, setPrice] = useState("");
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    let [imageUrl, setImageUrl] = useState("");
    let [description, setDescription] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = { name: [], type:[], capacity:[], price:[], startDate:[],
            endDate:[], imageUrl:[], description:[] };
        if (!name.length) errors["name"].push("Name is required");
        if (!type.length) errors["type"].push("Event Type is required");
        if (!capacity.length) errors["capacity"].push("Event Capacity is required");
        // if (typeof(capacity)!=="number") errors["capacity"].push("Event Capacity is a number");
        // if (capacity < 1) errors["capacity"].push("Minimum Event Capacity is 1");
        if (!price.length) errors["price"].push("Price is required");
//     //     // if (price < 0) errors["price"].push("Minimum Price is 0");
        if (!startDate.length) errors["startDate"].push("Event start is required");
//     //     if (!endDate.length) errors["endDate"].push("Event end is required");
//     //     // .png, .jpg, or .jpeg
//     //     if(!imageUrl.endsWith('.png') && !imageUrl.endsWith('.jpg') && !imageUrl.endsWith('.jpeg'))
//     //     errors["imageUrl"].push("Image URL must end in .png, .jpg, or .jpeg");
//     //     if (description.length < 30) errors["about"].push("Description needs 30 or more characters");
        setValidationErrors(errors);
}, [name, type, capacity, price, startDate, endDate, imageUrl, description]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        let groupId = 1;
        let event = [];
//         // console.log(validationErrors);
        event = { ...event, name, type, capacity, price, startDate, endDate, description};
//         console.log("78group", group);
        let newEvent;
        let errorCount = validationErrors.name.length + validationErrors.type.length
        + validationErrors.capacity.length + validationErrors.price.length
        + validationErrors.startDate.length + validationErrors.endDate.length
        + validationErrors.description.length + validationErrors.imageUrl.length;
//         console.log(errorCount);
        if (errorCount > 0){
            console.log("has errors");
            }else{
                console.log("no errors");
                if (formType === "Create Group") {
                    newEvent = await dispatch(createGroupEvent(group.id, event));
                    // let EventImages={url: imageUrl};
                    // await dispatch(createEventImage(EventImages, event.id));
                }
                if (newEvent.id) {
                    console.log("/events/${newEvent.id}", newEvent.id);
                    history.push(`/events/${newEvent.id}`);
                } else {
                    const { validationErrors } = await newEvent.json();
                    setValidationErrors(validationErrors);
                }
                console.log(newEvent);

                setName('');
                setType('');
                setCapacity('');
                setPrice('');
                setStartDate('');
                setEndDate('');
                setImageUrl('');
                setDescription('');
                setValidationErrors({});
                setHasSubmitted(false);
            }
};

// //     /* **DO NOT CHANGE THE RETURN VALUE** */
    return (
         <form onSubmit={handleSubmit}>
             {/* {console.log(validationErrors)} {group.name}*/}
             <h2>Create a new event for </h2>
             <div>
                 <label>
                     What is the name of your event?
                     <input
                         id='name'
                         type="text"
                         placeholder="Event Name?"
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
                     Is this an in-person or online group?
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
                    What is the capacity for your event?
                    <input
                        id='capacity'
                        type="number"
                        placeholder="1"
                        onChange={(e) => setCapacity(e.target.value)}
                        value={capacity}
                        min="1"
                    />
                    {hasSubmitted &&
                        validationErrors.capacity.length > 0 &&
                        validationErrors.capacity.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>
            <div>
                <label>
                    What is the price for your event?
                    <input
                        id='price'
                        type="number"
                        placeholder="0"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        min="0"
                    />
                    {hasSubmitted &&
                        validationErrors.price.length > 0 &&
                        validationErrors.price.map((error, idx) => (
                            <div key={idx}>
                                <p className="error">{error}</p>
                            </div>
                        ))}
                </label>
            </div>

             <div>
                <label>
                     <input
                         id='startDate'
                         type="datetime-local"
                         name="startDate"
                         placeholder="MM/DD/YYYY, HH/mm AM"
                        onChange={(e) => setStartDate(e.target.value)}
                         value={startDate}
                        min={Date()}
                     />
                     {hasSubmitted &&
                         validationErrors.startDate.length > 0 &&
                         validationErrors.startDate.map((error, idx) => (
                             <div key={idx}>
                                 <p className="error">{error}</p>
                             </div>
                         ))}
                 </label>
             </div>
{/*
//             <div>
//                 <label>
//                     <input
//                         id='endDate'
//                         type="datetime-local"
//                         name="endDate"
//                         placeholder="MM/DD/YYYY, HH/mm AM"
//                         onChange={(e) => setName(e.target.value)}
//                         value={endDate}
//                         min={startDate}
//                     />
//                     {hasSubmitted &&
//                         validationErrors.endDate.length > 0 &&
//                         validationErrors.endDate.map((error, idx) => (
//                             <div key={idx}>
//                                 <p className="error">{error}</p>
//                             </div>
//                         ))}
//                 </label>
//             </div>
//             <div>
//                 <label>Please add in image url for your group below:
//                     <textarea
//                         id='imageUrl'
//                         value={imageUrl}
//                         placeholder="image url"
//                         onChange={(e) => setImageUrl(e.target.value)}
//                     />
//                     {hasSubmitted &&
//                         validationErrors.imageUrl.length > 0 &&
//                         validationErrors.imageUrl.map((error, idx) => (
//                             <div key={idx}>
//                                 <p className="error">{error}</p>
//                             </div>
//                         ))}
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     <textarea
//                         id='description'
//                         value={description}
//                         placeholder="Please write at least 30 characters"
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                     {hasSubmitted &&
//                         validationErrors.description.length > 0 &&
//                         validationErrors.description.map((error, idx) => (
//                             <div key={idx}>
//                                 <p className="error">{error}</p>
//                             </div>
//                         ))}
//                 </label>
//             </div>*/}
            <button type="submit" id="EventFormButton" >{formType}</button>
        </form>
     )
                        }
export default EventForm;
