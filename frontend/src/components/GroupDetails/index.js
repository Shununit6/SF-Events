import { useState } from "react";
import { useParams } from "react-router-dom";

const GroupDetails = () => {
    const [text, setText ] = useState("");
    const { groupId } = useParams();

    const addText = (e) => {
        e.preventDefault();
        console.log(text, groupId);
    };

    return(
        <div>

        </div>
    );
};

export default GroupDetails;
