// import { csrfFetch } from "./csrf";
/** Action Type Constants: */
export const LOAD_GROUPS = "groups/LOAD_GROUPS";
// export const GET_GROUP = "groups/GET_GROUP";

/**  Action Creators: */
export const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
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

// export const getGroupById = (groupId) => async (dispatch) => {
//     const res = await fetch(`/api/groups/${groupId}`);

//     if (res.ok) {
//         const data = await res.json();
//         console.log("data", data);
//         dispatch(addOneGroup(data));
//         return data;
//     }
//     return res;
// };

// export const getOnePokemon = id => async dispatch => {
//     const response = await fetch(`/api/pokemon/${id}`);

//     if (response.ok) {
//       const pokemon = await response.json();
//       dispatch(addOnePokemon(pokemon));
//     }
//   };

const groupsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_GROUPS:
            const groupsState = {};
            console.log("getallgroups", action.groups.Groups);
            action.groups.Groups.forEach((group) => {
                groupsState[group.id] = group;
            });
            console.log(groupsState);
            return {...groupsState};
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
