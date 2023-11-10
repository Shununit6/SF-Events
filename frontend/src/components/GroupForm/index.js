import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createGroup, updateGroup } from "../../store/groups";

const GroupForm = ({ group, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [city, setCity] = useState(group?.city);
    const [state, setState] = useState(group?.state);
    const [name, setName] = useState(group?.name);
    const [about, setAbout] = useState(group?.about);
    const [type, setType] = useState(group?.type);
    const [isPrivate, setIsPrivate] = useState(group?.private);

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        group = { ...group, city, state, name, about, type, isPrivate};

        let newGroup;

        if (formType === "Update Group") {
            newGroup = await dispatch(updateGroup(group));
        } else {
            newGroup = await dispatch(createGroup(group));
        }

        if (newGroup.id) {
            history.push(`/reports/${newGroup.id}`);
        } else {
            const { errors } = await newGroup.json();
            setErrors(errors);
        }
    };

//     /* **DO NOT CHANGE THE RETURN VALUE** */
    return (
        <form onSubmit={handleSubmit}>
            <h2>{formType}</h2>
            <h2>We'll walk you through a few steps to build your local community</h2>
            <h2>First, set your group's location.</h2>
            <p>Meetup groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.</p>
            <div className="errors">{errors.city}, {errors.state}</div>
                <label>
                    Location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => {setCity(e.target.value.split(",")[0])
                                        , setState(e.target.value.split(",")[1])}}
                    />
                </label>
            <div className="errors">{errors.name}</div>
                <label>
                    What is your group name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
            <div className="errors">{errors.about}</div>
                <label>
                    <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                </label>
            <div className="errors">{errors.about}</div>
                <label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="In person">In person</option>
                        <option value="Online">Online</option>
                    </select>
                </label>
                <div className="errors">{errors.type}</div>
                <label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="In person">In person</option>
                        <option value="Online">Online</option>
                    </select>
                </label>
                <div className="errors">{errors.isPrivate}</div>
                <label>
                    <select value={isPrivate} onChange={(e) => setIsPrivate(e.target.value)}>
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                    </select>
                </label>
            <button type="submit">{formType}</button>
        </form>
    );
};

export default GroupForm;
