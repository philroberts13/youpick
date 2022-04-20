import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import { createIdea } from "../../store/ideas";
import { NavLink } from "react-router-dom";



function IdeaForm({ closeModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const userId = user.id
    const {id} = useParams();
    const listId = id;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState(['nada']);


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
            closeModal()
        }

    }

    return (
        <div>
            <div className="errors">
        {errors && !(errors[0] === 'nada') && (
          <ul>
          {errors?.map((error) => (
            <li>{error}</li>
          ))}
          </ul>
        )}
        </div>
        <div className="background-modal">
        <div className="idea-list-modal">
        <form className="idea-form" onSubmit={handleSubmit}>
            <label>Title...
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>Description...
                <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <button className="submit" type="submit">submit</button>
            <button className="cancel" onClick={() => closeModal(false)}>cancel</button>
        </form>
        </div>
        </div>
        </div>
    )
}


export default IdeaForm;
