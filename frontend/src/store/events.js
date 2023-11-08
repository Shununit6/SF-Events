// import { csrfFetch } from "./csrf";
/** Action Type Constants: */
export const LOAD_EVENTS = "events/LOAD_EVENTS";
export const LOAD_EVENT_DETAILS = "events/LOAD_EVENT_DETAILS";

/**  Action Creators: */
export const loadEvents = (events) => ({
    type: LOAD_EVENTS,
    events,
});

export const loadEventDetails = (events) => ({
    type: LOAD_EVENT_DETAILS,
    events,
});

/** Thunk Action Creators: */
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
    const res = await fetch(`/api/events/${eventId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadEventDetails(data));
        return data;
    }
    return res;
}

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
            groupState[action.events.id] = action.events;
            return eventState;
        }
        default:
            return state;
    }
};

export default eventsReducer;
