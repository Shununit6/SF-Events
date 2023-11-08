// import { csrfFetch } from "./csrf";
/** Action Type Constants: */
export const LOAD_GROUPS = "groups/LOAD_GROUPS";
export const LOAD_GROUP_DETAILS = "groups/LOAD_GROUP_DETAILS";
export const REMOVE_GROUP = "groups/REMOVE_GROUP";
// export const GET_GROUP = "groups/GET_GROUP";

/**  Action Creators: */
export const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups,
});

export const loadGroupDetails = (groups) => ({
    type: LOAD_GROUP_DETAILS,
    groups,
});

export const removeGroup = (groups) => ({
    type: REMOVE_GROUP,
    groups,
});

// export const getGroup = (groups) => ({
//     type: GET_GROUP,
//     groups,
// });

/** Thunk Action Creators: */
export const getAllGroups = () => async (dispatch) => {
    const res = await fetch("/api/groups");

    if (res.ok) {
        const data = await res.json();
        console.log("data", data);
        dispatch(loadGroups(data));
        return data;
    }
    return res;
};

export const groupDetails = (groupId) => async dispatch => {
    const res = await fetch(`/api/groups/${groupId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadGroupDetails(data));
        return data;
    }
    return res;
}

export const deleteGroup = (groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeGroup(groupId));
        return data;
    }
    return res;
};

const groupsReducer = (state = { }, action) => {
    switch (action.type) {
        case LOAD_GROUPS:
            const groupsState = { ...state };
            action.groups.Groups.forEach((group) => {
                if(!groupsState[group.id]) {groupsState[group.id] = group;}
            });
            return {...groupsState};
        case LOAD_GROUP_DETAILS: {
            const groupState = { ...state };
            groupState[action.groups.id] = action.groups;
            return groupState;
        }
        case REMOVE_GROUP:{
            const groupState = { ...state };
            delete groupState[action.groups.id];
            return groupState;
        }
        // case GET_GROUP:
        //     const groupState = {};
        //     console.log("getgroupbyid", action.groups);
        //     // console.log(groupState);
        //     // return {...groupState};
        default:
            return state;
    }
};

export default groupsReducer;
