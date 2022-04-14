import { csrfFetch } from "./csrf";

const LOAD_LISTS = 'lists/LOAD_LISTS';
const LOAD_ALL_LISTS = 'lists/LOAD_ALL_LISTS';
const LOAD_ONE_LIST = 'lists/LOAD_ONE_LIST'
const ADD_LIST = 'lists/ADD_LIST'
const DELETE_LIST = 'lists/DELETE_LIST';
const UPDATE_LIST = 'lists/UPDATE_LIST';

const updateList = (list) => ({
    type: UPDATE_LIST,
    list
})

const loadList = list => ({
    type: LOAD_ONE_LIST,
    list
})

const loadUserLists = (lists) => ({
    type: LOAD_LISTS,
    lists
})

const loadAllLists = (lists) => ({
    type: LOAD_ALL_LISTS,
    lists
})

const addList = (list) => ({
    type: ADD_LIST,
    list
})

const deleteList = (listId) => ({
    type: DELETE_LIST,
    listId
})

export const getUserLists = (userId) => async dispatch => {
    const response = await fetch(`/api/lists/${userId}`);

    if(response.ok) {
        const userList = await response.json();
        dispatch(loadUserLists(userList));
    }
}

export const getLists = () => async dispatch => {
    const response = await fetch('/api/lists');

    if(response.ok) {
        const allLists = await response.json();
        dispatch(loadAllLists(allLists));
    }
}

export const getListById = (id) => async (dispatch) => {
    const response = await fetch(`/api/lists/page/${id}`);
    if(response.ok) {
        let list = await response.json();

        dispatch(loadList(list));
    }
    return response;
}

export const removeList = (listId) => async dispatch => {
    const response = await csrfFetch(`/api/lists/page/${listId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},

    })
    if (response.ok) {
        dispatch(deleteList(listId))
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

export const editList = (list) => async (dispatch) => {
    const response = await csrfFetch(`/api/lists/page/edit/${list.id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(list)
    })
    if(response.ok) {
        const updatedList = await response.json()
        dispatch(updateList(updatedList))
        return updatedList;
    }
    return response;
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

        case LOAD_ONE_LIST:
            newState = {...state}
            newState[action.list.id] = action.list;
            return newState

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

        case UPDATE_LIST: {
            const newState = {...state, [action.list.id]: action.list};
            return newState;
        }

        case DELETE_LIST:
            const newState = {...state};
            delete newState[action.listId];
            return newState

        default: return state;
    }
}

export default listsReducer;
