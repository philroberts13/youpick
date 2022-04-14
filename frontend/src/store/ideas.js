import { csrfFetch } from "./csrf";

const LOAD_IDEAS = 'ideas/LOAD_IDEAS';
const LOAD_ALL_IDEAS = 'ideas/LOAD_ALL_IDEAS'

const loadIdeas = ideas => ({
    type: LOAD_IDEAS,
    ideas
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

let initialState = {};

const ideasReducer = (state = initialState, action) => {

    switch(action.type) {
        case LOAD_IDEAS:
            const listIdeas = {}
                action.ideas.forEach(idea => {
                    listIdeas[idea.id] = idea;
                });
                return {
                    ...listIdeas
                }

        default: return state;
    }
}

export default ideasReducer;
