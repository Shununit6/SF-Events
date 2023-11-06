// import { csrfFetch } from "./csrf";
/** Action Type Constants: */
export const LOAD_GROUPS = "groups/LOAD_GROUPS";

/**  Action Creators: */
export const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups,
});

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

const groupsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_GROUPS:
            const groupsState = action.groups.Groups;
            console.log("getallgroups", action.groups.Groups);
            // action.getAllGroups.forEach((group) => {
            //     groupsState[group.id] = group;
            // });
            return groupsState;
        default:
            return state;
    }
};

export default groupsReducer;
