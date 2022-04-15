import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import { createIdea } from "../../store/ideas";
import { NavLink } from "react-router-dom";



function IdeaForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const userId = user.id
    const {id} = useParams();
    const listId = id;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newIdea = {
        userId,
        listId,
        title,
        description
    }

    let createdIdea = await dispatch(createIdea(newIdea))
    .catch(async (response) => {
        const data = await response.json();
        if (data && data.errors) {
            if (data.errors)
            setErrors(data.errors);
        }});

        if(createdIdea) {
            setTitle("")
            setDescription("")
            // history.push(`/lists/${userId}`)
        }

    }

    return (
        <div>
            Idea Form

            <div className="errors">
        {errors && !(errors[0] === 'nada') && (
          <ul>
          {errors?.map((error) => (
            <li>{error}</li>
          ))}
          </ul>
        )}
        </div>
        <form onSubmit={handleSubmit}>
            <label>Title
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>Description
                <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <button type="submit">submit</button>
        </form>
        </div>
    )
}


export default IdeaForm;
