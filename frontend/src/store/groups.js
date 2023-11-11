// import { csrfFetch } from "./csrf";
/** Action Type Constants: */
export const LOAD_GROUPS = "groups/LOAD_GROUPS";
export const LOAD_GROUP_DETAILS = "groups/LOAD_GROUP_DETAILS";
export const REMOVE_GROUP = "groups/REMOVE_GROUP";
export const GET_GROUP_EVENTS = "groups/GET_GROUP_EVENTS";
export const RECEIVE_GROUP = "groups/RECEIVE_GROUP";
export const UPDATE_GROUP = "groups/UPDATE_GROUP";
export const RECEIVE_GROUP_IMAGE = "groups/RECEIVE_GROUP_IMAGE";

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

export const getGroupEvents = (events, groupId) => ({
    type: GET_GROUP_EVENTS,
    events,
    groupId
});

export const receiveGroup = (group) => ({
    type: RECEIVE_GROUP,
    group,
});

export const editGroup = (group) => ({
    type: UPDATE_GROUP,
    group,
});

export const receiveGroupImage = (groupImage) => ({
    type: RECEIVE_GROUP_IMAGE,
    groupImage,
});


export const createGroup = (payload) => async (dispatch) => {
    const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveGroup(data));
        return data;
    }
    return res;
};

export const updateGroup = (payload) => async (dispatch) => {
    const res = await fetch(`/api/groups/${payload.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(editGroup(data));
        return data;
    }
    return res;
};

/** Thunk Action Creators: */
export const getAllGroups = () => async (dispatch) => {
    const res = await fetch("/api/groups");

    if (res.ok) {
        const data = await res.json();
        // console.log("data", data);
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

export const getGroupIdEvents = (groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/events`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getGroupEvents(data.Events, groupId));
        // console.log("data", data);
        // console.log("datalength", data.Events.length);
        return data;
    }
    return res;
};

export const createGroupImage = (groupImage, groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupImage),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveGroupImage(data));
        return data;
    }
    return res;
};

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
        case LOAD_GROUPS:{
            const groupsState = { ...state };
            action.groups.Groups.forEach((group) => {
                if(!groupsState[group.id]) {groupsState[group.id] = group;}
            });
            return groupsState;
        };
        case LOAD_GROUP_DETAILS: {
            const groupState = { ...state };
            groupState[action.groups.id] = action.groups;
            return groupState;
        };
        case GET_GROUP_EVENTS: {
            const groupState = { ...state };
            const eventsObj = {};
            action.events.forEach((event)=>{
                eventsObj[event.id] = event;
            });
            groupState[action.groupId].events = eventsObj;
            return groupState;
        };
        case RECEIVE_GROUP_IMAGE: {
            const groupState = { ...state };

            // console.log("actiongroups", action);
            // console.log("actiongroupsid",action.groups.id);
            // console.log(groupState);
            return groupState;
        };
        case REMOVE_GROUP:{
            const groupState = { ...state };
            delete groupState[action.groups.id];
            return groupState;
        };
        case RECEIVE_GROUP:
            return { ...state, [action.group.id]: action.group };
        case UPDATE_GROUP:
            return { ...state, [action.group.id]: action.group };

        default:
            return state;
    }
};

export default groupsReducer;
