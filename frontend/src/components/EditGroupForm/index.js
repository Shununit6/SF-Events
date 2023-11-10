import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { groupDetails } from "../../store/groups";
import { useEffect } from "react";
import GroupForm from "../GroupForm";

const EditGroupForm = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const group = useSelector((state) => state.groups[groupId]);

    useEffect(() => {
        dispatch(groupDetails(groupId));
    }, [dispatch, groupId]);

    if (!group) return <></>;

    /* **DO NOT CHANGE THE RETURN VALUE** */
    return (
        Object.keys(group).length > 1 && (
            <>
                <GroupForm group={group} formType="Update Group" />
            </>
        )
    );
};

export default EditGroupForm;
