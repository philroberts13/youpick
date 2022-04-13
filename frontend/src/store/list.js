import { csrfFetch } from "./csrf";

const LOAD_LISTS = 'lists/LOAD_LISTS';
const LOAD_ALL_LISTS = 'lists/LOAD_ALL_LISTS';
const ADD_LIST = 'lists/ADD_LIST'


const loadUserLists = lists => ({
    type: LOAD_LISTS,
    lists
})

const loadAllLists = lists => ({
    type: LOAD_ALL_LISTS,
    lists
})

const addList = (list) => ({
    type: ADD_LIST,
    list
})

export const getUserLists = (userId) => async dispatch => {
    const response = await fetch(`/api/lists/${userId}`);

    if(response.ok) {
        const userList = await response.json();
        dispatch(loadUserLists(userList));
    }
}

export const getLists = () => async dispatch => {
    const response = await fetch(`/api/lists`);

    if(response.ok) {
        const allLists = await response.json();
        dispatch(loadAllLists(allLists));
    }
}

export const createList = (payload) => async dispatch => {
    const response = await csrfFetch('/api/lists', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok){
        const newList = await response.json()
        dispatch(addList(newList))
        return newList
    }

}

let initialState = {};

const listsReducer = (state = initialState, action) => {
    let newState

    switch(action.type) {
        case LOAD_LISTS:
            const userLists = {}
                action.lists.forEach(list => {
                    userLists[list.id] = list;
                });
                return {
                    ...userLists
                }
        case LOAD_ALL_LISTS:
            const allList = {}
                action.lists.forEach(list => {
                    allList[list.id] = list;
                });
                return {
                    ...allList
                }
        case ADD_LIST:
            if (!state[action.list.id]) {
                const newState = {
                    ...state,
                    [action.list.id]: action.list
                }
                return newState;
            }
            return {
                ...state,
                [action.list.id]: {
                    ...state[action.list.id],
                    ...state.list
                }
            }

        default: return state;
    }
}

export default listsReducer;
