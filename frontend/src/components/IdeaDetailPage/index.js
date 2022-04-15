import React, { useEffect,  useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getIdea } from "../../store/ideas";


function IdeaDetailPage() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const idea = useSelector((state) => state.ideas[id])
    console.log(idea)

    // useEffect(() => {
    //     dispatch(getIdea(id))
    // }, [dispatch])


    if (idea) {
    return (
        <div>
            <h2>{idea.title}</h2>
            <div>{idea.description}</div>


        </div>
     )
    }
}

export default IdeaDetailPage;
