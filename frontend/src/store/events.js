import { csrfFetch } from "./csrf";
// /** Action Type Constants: */
export const LOAD_EVENTS = "events/LOAD_EVENTS";
export const LOAD_EVENT_DETAILS = "events/LOAD_EVENT_DETAILS";
// export const REMOVE_EVENT = "events/REMOVE_EVENT";
export const REMOVE_GROUP_EVENTS = "events/REMOVE_EVENT";
// /**  Action Creators: */
export const loadEvents = (events) => ({
    type: LOAD_EVENTS,
    events,
});

export const loadEventDetails = (events) => ({
    type: LOAD_EVENT_DETAILS,
    events,
});

// export const removeEvent = (events) => ({
//     type: REMOVE_EVENT,
//     events,
// });

export const removeGroupEvents = (groupId) => ({
    type: REMOVE_GROUP_EVENTS,
    groupId,
});


// /** Thunk Action Creators: */
export const getAllEvents = () => async (dispatch) => {
    const res = await fetch("/api/events");

    if (res.ok) {
        const data = await res.json();
        console.log("data", data);
        dispatch(loadEvents(data));
        return data;
    }
    return res;
};

export const eventDetails = (eventId) => async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadEventDetails(data));
        // console.log("hey there",data);
        return data;
    }
    return res;
}



// export const deleteEvent = (eventId) => async (dispatch) => {
//     const res = await fetch(`/api/events/${eventId}`, {
//         method: "DELETE",
//     });

//     if (res.ok) {
//         const data = await res.json();
//         dispatch(removeEvent(eventId));
//         return data;
//     }
//     return res;
// };

const eventsReducer = (state = { }, action) => {
    switch (action.type) {
        case LOAD_EVENTS:
            const eventsState = {...state};
            action.events.Events.forEach((event) => {
                if(!eventsState[event.id]) {eventsState[event.id] = event;}
            });
            return {...eventsState};
        case LOAD_EVENT_DETAILS: {
            const eventState = {...state};
            // console.log("action.events", action.events);
            eventState[action.events.id] = action.events;
            return eventState;
        }
        // case REMOVE_EVENT:{
        //     const eventState = { ...state };
        //     delete eventState[action.events.id];
        //     return eventState;
        // }
        case REMOVE_GROUP_EVENTS:{
            const events = {};
            Object.values(state.events).forEach((event)=>{
                if(event.groupId !== action.groupId){
                    events[event.id] = event;
                }
            });
            return events;
        }
        default:
            return state;
    }
};

export default eventsReducer;
