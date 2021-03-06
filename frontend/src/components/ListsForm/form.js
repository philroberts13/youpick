import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import { createList } from "../../store/list";
import { NavLink } from "react-router-dom";
import { getUserLists } from "../../store/list";
import UserListPage from "../UserListPage";
import './ListsForm.css'


const TYPES = [
    "Movies",
    "Books",
    "TV Shows",
    "Travel",
    "Food"
]

function ListsFormModal({ closeModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const userId = user.id
    const [title, setTitle] = useState("");
    const [type, setType] = useState(TYPES[0]);
    const [errors, setErrors] = useState(['nada'])

    useEffect(() => {
        dispatch(getUserLists(userId))
    }, [dispatch]);

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
            if (data && data.errors) {
                if (data.errors)
                setErrors(data.errors);
            }});

            if(createdList) {
                setTitle("")
                // history.push(`/lists/${userId}`)
                closeModal()
            }

        }

    return (
        <div className="background-modal">
            <div className="list-modal">

            <form className="form" onSubmit={handleSubmit}>
                    <div className="form-title">
                    Your New List
                    </div>
                    <div className="errors">
                    {errors && !(errors[0] === 'nada') && (
                    <ul>
                    {errors?.map((error) => (
                    <li>{error}</li>
                    ))}
                    </ul>
                    )}
                    </div>
                <label> Title...
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>Select a Category
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
                <button className="submit" type="submit">submit</button>
                <button className="cancel" onClick={() => closeModal(false)}>cancel</button>
            </form>

        </div>
    </div>
    )

}

export default ListsFormModal;
