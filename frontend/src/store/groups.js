import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_GROUPS = "groups/LOAD_GROUPS";
export const LOAD_GROUP_DETAILS = "groups/LOAD_GROUP_DETAILS";
export const GET_GROUP_EVENTS = "groups/GET_GROUP_EVENTS";
export const RECEIVE_GROUP = "groups/RECEIVE_GROUP";
export const UPDATE_GROUP = "groups/UPDATE_GROUP";
export const UPDATE_GROUP_IMAGES = "groups/UPDATE_GROUP_IMAGES";
export const RECEIVE_GROUP_IMAGE = "groups/RECEIVE_GROUP_IMAGE";
export const RECEIVE_GROUP_EVENT = "groups/RECEIVE_GROUP_EVENT";
export const REMOVE_GROUP = "groups/REMOVE_GROUP";
export const RECEIVE_GROUP_VENUE = "groups/RECEIVE_GROUP_VENUE";

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
    group
});

export const editGroupImages = (imageUrl) => ({
    type: UPDATE_GROUP,
    imageUrl
});

export const receiveGroupImage = (groupImage) => ({
    type: RECEIVE_GROUP_IMAGE,
    groupImage,
});

export const receiveGroupEvent = (groupEvent) => ({
    type: RECEIVE_GROUP_EVENT,
    groupEvent,
});

export const receiveGroupVenue = (groupVenue) => ({
    type: RECEIVE_GROUP_VENUE,
    groupVenue,
});

/** Thunk Action Creators: */
export const createGroupVenue = (groupVenue, groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/venues`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupVenue),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveGroupEvent(data));
        return data;
    }
    return res;
};

export const createGroup = (payload) => async (dispatch) => {
    const res = await csrfFetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    // console.log("res", res);
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveGroup(data));
        return data;
    }
    return res;
};

export const updateGroup = (group) => async (dispatch) => {
    // console.log("functionupdateGroup", group);
    const res = await csrfFetch(`/api/groups/${group.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(group),
    });
    // console.log("functionupdateGroup", res);
    if (res.ok) {
        const data = await res.json();
        // console.log("functionupdateGroup", data);
        dispatch(editGroup(data));
        return data;
    }
    return res;
};

export const updateGroupImages = (group) => async (dispatch) => {
    // console.log("functionupdateGroupImages", group);
    const res = await csrfFetch(`/api/groups/${group.id}/GroupImages/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(group),
    });
    // console.log("functionupdateGroupImages", res);
    if (res.ok) {
        const data = await res.json();
        // console.log("functionupdateGroupImages", data);
        dispatch(editGroup(data));
        return data;
    }
    return res;
};

export const getAllGroups = () => async (dispatch) => {
    const res = await csrfFetch("/api/groups");

    if (res.ok) {
        const data = await res.json();
        // console.log("data", data);
        dispatch(loadGroups(data));
        return data;
    }
    return res;
};

export const groupDetails = (groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadGroupDetails(data));
        return data;
    }
    return res;
}

export const getGroupIdEvents = (groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/events`);

    if (res.ok) {
        const data = await res.json();
        await dispatch(getGroupEvents(data.Events, groupId));
        // console.log("data", data);
        // console.log("datalength", data.Events.length);
        return data;
    }
    return res;
};

export const createGroupImage = (groupImage, groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/images`, {
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

export const createGroupEvent = (groupEvent, groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupEvent),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveGroupEvent(data));
        return data;
    }
    return res;
};

export const deleteGroup = (groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}`, {
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
            // console.log("actiongroups", action.groups);
            action.groups.Groups.forEach((group) => {
                if(!groupsState[group.id]) {groupsState[group.id] = group;}
            });
            return groupsState;
        };
        case LOAD_GROUP_DETAILS: {
            const groupState = { ...state };
            // console.log("loadgroupdetails",action);
            groupState[action.groups.id] = action.groups;
            return groupState;
        };
        case GET_GROUP_EVENTS: {
            // const groupState = { ...state };
            const eventsObj = {};
            action.events.forEach((event)=>{
                eventsObj[event.id] = event;
            });
            // const modifiedGroup = state[action.groupId];
            // modifiedGroup.events = eventsObj;
            return {...state, [action.groupId]: {...state[action.groupId], Events: eventsObj} };
        };
        case REMOVE_GROUP:{
            const groupState = { ...state };
            delete groupState[action.groups];
            // console.log("whatotkeyinto", action.groups)
            // console.log(groupState);
            return groupState;
        };
        case RECEIVE_GROUP_IMAGE: {
            const groupState = { ...state };
            return groupState;
        };
        case RECEIVE_GROUP_EVENT: {
            const groupState = { ...state };
            // console.log("actionreveive_group_event", action.groupEvent);
            return groupState;
        };
        case RECEIVE_GROUP_VENUE: {
            const groupState = { ...state };
            // console.log("actionreveive_group_event", action.groupVenue);
            return groupState;
        };
        case RECEIVE_GROUP:
            // console.log("RECEIVE_GROUP",action);
            // console.log("RECEIVE_GROUP", action.group);
            // console.log("stategroup", state);
            return { ...state, [action.group.id]: action.group };
        case UPDATE_GROUP:
            // console.log("action.imageUrl", action.imageUrl);
            return {...state};
            // return { ...state, [action.group.id]: action.group };
        case UPDATE_GROUP_IMAGES:
            // console.log("action.imageUrl", action.imageUrl);
            return {...state};
        default:
            return state;
    }
};

export default groupsReducer;
