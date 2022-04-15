import React, { useEffect,  useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getIdeas, createIdea, removeIdea } from "../../store/ideas";
import { removeList, getListById, editList } from "../../store/list";
import IdeaForm from "../IdeaForm";

function ListDetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const userId = useSelector(state => state.session.user.id);
    const ideas = useSelector(state => state.ideas)
    const list = useSelector(state => (state.lists[+id]));

    console.log(id)

    useEffect(() => {
        dispatch(getIdeas(id))
    }, [dispatch, id]);


    const deleteList = async (e) => {
        await dispatch(removeList(id))
    }

    const deleteIdea = async (e, ideaId) => {
        await dispatch(removeIdea(ideaId))
    }

    let ideasList = Object.values(ideas)?.map(idea => (
        <li key={idea.id}>
           <NavLink style={{textDecoration: 'none'}} to={`/ideas/${idea.id}`} >{idea.title}: {idea.description}</NavLink>
        </li>
    ))


if (list) {
return (
    <div>
        <h1>This is about the list</h1>
        <div>{list.title}</div>
        <button onClick={deleteList}><NavLink style={{textDecoration: 'none'}} to={`/lists/${userId}`}>Delete</NavLink></button>
        <button><NavLink style={{textDecoration: 'none'}} to={`/lists/page/edit/${id}`}>Edit</NavLink></button>

        {ideasList}
    <div>

        <IdeaForm />
    </div>



    </div>
        )
    }
}

export default ListDetailPage;
