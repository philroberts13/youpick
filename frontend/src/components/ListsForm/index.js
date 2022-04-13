import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import { createList } from "../../store/list";


const TYPES = [
    "Movies",
    "Books",
    "TV Shows",
    "Travel",
    "Food"
]

function ListsForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const userId = user.id
    const [title, setTitle] = useState("");
    const [type, setType] = useState(TYPES[0]);
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newList = {
            userId,
            title,
            type
        };

        let createdList = await dispatch(createList(newList))
        .catch(async (response) => {
            const data = await response.json();
            });

        if(createList) {
            history.push(`/lists/${userId}`)
        }

    }

    return (
        <div>
            Hello I am a Form
        <form onSubmit={handleSubmit}>
            <label>Title
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>Select a Type
            <select
                onChange={(e) => setType(e.target.value)}
                value={type}
                >
                    {TYPES.map(type => (
                        <option
                            key={type}
                            >
                                {type}
                            </option>
                    ))}
            </select>
            </label>
            <button type="submit">submit</button>
        </form>


        </div>

    )
}

export default ListsForm;
