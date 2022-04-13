import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getLists } from "../../store/list";


function ListsPage() {
    const dispatch = useDispatch();

    const lists = useSelector(state => {
        return Object.values(state.lists)
    });


    useEffect(() => {
        dispatch(getLists())
    }, [dispatch]);

    return (
        <div>
            <h1>all the lists</h1>
        </div>
    )


}

export default ListsPage;
