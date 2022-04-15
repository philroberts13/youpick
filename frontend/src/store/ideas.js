import { csrfFetch } from "./csrf";

const LOAD_IDEAS = 'ideas/LOAD_IDEAS';
const LOAD_ALL_IDEAS = 'ideas/LOAD_ALL_IDEAS'
const LOAD_IDEA = 'ideas/LOAD_IDEA'
const UPDATE_IDEA = 'ideas/UPDATE_IDEA';
const ADD_IDEA = 'ideas/ADD_IDEA';
const DELETE_IDEA = 'ideas/DELETE_IDEA'

const loadIdeas = ideas => ({
    type: LOAD_IDEAS,
    ideas
})

const loadIdea = idea => ({
    type: LOAD_IDEAS,
    idea
})

const updateIdea = idea => ({
    type: UPDATE_IDEA,
    idea
})

const addIdea = idea => ({
    type: ADD_IDEA,
    idea
})

const deleteIdea = ideaId => ({
    type: DELETE_IDEA,
    ideaId
})


export const getAllIdeas = () => async dispatch => {
    const response = await fetch(`/api/ideas`);

    if(response.ok) {
        const allIdeas = await response.json();
        dispatch(loadIdeas(allIdeas));
    }
}

export const getIdeas = (listId) => async dispatch => {
    const response = await fetch(`/api/ideas/${listId}`);

    if(response.ok) {
        const ideas = await response.json();
        dispatch(loadIdeas(ideas));
    }
}

export const getIdea = (ideaId) => async dispatch => {
    const response = await fetch(`/api/ideas/${ideaId}`);

    if (response.ok) {
        const idea = await response.json();
        dispatch(loadIdea(idea))
    }
}

export const removeIdea = (ideaId) => async dispatch => {
    const response = await csrfFetch(`/api/ideas/edit/${ideaId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},

    })
    if (response.ok) {
        dispatch(deleteIdea(ideaId))
    }
}

export const createIdea = (payload) => async dispatch => {
    const response = await csrfFetch('/api/ideas', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok){
        const newIdea = await response.json()
        dispatch(addIdea(newIdea))
        return newIdea
    }

}

export const editList = (idea) => async (dispatch) => {
    const response = await csrfFetch(`/api/ideas/edit/${idea.id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(idea)
    })
    if(response.ok) {
        const updatedIdea = await response.json()
        dispatch(updateIdea(updatedIdea))
        return updatedIdea;
    }
    return response;
}



let initialState = {};

const ideasReducer = (state = initialState, action) => {
    let newState = {...state};

    switch(action.type) {
        case LOAD_IDEAS:
            const listIdeas = {}
                action.ideas.forEach(idea => {
                    listIdeas[idea.id] = idea;
                });
                return {
                    ...listIdeas
                }

        case LOAD_IDEA:
            newState[action.idea.id] = action.list;
            return newState

        case ADD_IDEA:
            if (!state[action.idea.id]) {
                const newState = {
                    ...state,
                    [action.idea.id]: action.idea
                }
                return newState;
            }
            return {
                ...state,
                [action.idea.id]: {
                    ...state[action.idea.id],
                    ...state.idea
                }
            }
            case UPDATE_IDEA: {
                const newState = {...state, [action.idea.id]: action.idea};
                return newState;
            }

            case DELETE_IDEA:
                delete newState[action.ideaId];
                return newState

        default: return state;
    }
}

export default ideasReducer;
