import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { removeList, getListById, editList } from "../../store/list";

function ListDetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const userId = useSelector(state => state.session.user.id);


    const list = useSelector(state => (state.lists[+id]));
    console.log(list)

    // useEffect(() => {
    //     dispatch(getListById(id))
    // }, [dispatch, id]);

    // console.log(listTest)

    const deleteList = async (e) => {
        await dispatch(removeList(id))
    }


return (
    <div>
        <h1>This is the place that has the detials about the list</h1>
        <div>{list.title}</div>
        <button onClick={deleteList}><NavLink style={{textDecoration: 'none'}} to={`/lists/${userId}`}>Delete</NavLink></button>
        <button><NavLink style={{textDecoration: 'none'}} to={`/lists/page/edit/${id}`}>Edit</NavLink></button>



    </div>
)
}

export default ListDetailPage;
