import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getIdeas } from "../../store/ideas";
import { removeList, getListById, editList } from "../../store/list";

function ListDetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const userId = useSelector(state => state.session.user.id);
    const ideas = useSelector(state => state.ideas)
    const list = useSelector(state => (state.lists[+id]));

    useEffect(() => {
        dispatch(getIdeas(id))
    }, [dispatch, id]);


    const deleteList = async (e) => {
        await dispatch(removeList(id))
    }

    let ideasList = Object.values(ideas)?.map(idea => (
        <li key={idea.id}>
            {idea.title}
            : {idea.description}
        </li>
    ))

return (
    <div>
        <h1>This is about the list</h1>
        <div>{list.title}</div>
        <button onClick={deleteList}><NavLink style={{textDecoration: 'none'}} to={`/lists/${userId}`}>Delete</NavLink></button>
        <button><NavLink style={{textDecoration: 'none'}} to={`/lists/page/edit/${id}`}>Edit</NavLink></button>

        {ideasList}



    </div>
)
}

export default ListDetailPage;
