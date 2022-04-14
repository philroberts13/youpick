import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import { createList } from "../../store/list";
import { NavLink } from "react-router-dom";
import { getUserLists } from "../../store/list";
import UserListPage from "../UserListPage";


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


    useEffect(() => {
        dispatch(getUserLists(userId))
    }, [dispatch]);

    const userList = useSelector(state => Object.values(state.lists).filter(list => {
        return list.userId === +userId;
      }))

      const testing = useSelector(state => {
          return Object.values(state.lists);
      })

    let listCards = userList?.map(list => (
        <>
            <NavLink key={list.id} to={`/lists/page/${list.id}`}>
            <div key={list.id}>
                <div>
                    {list.title}
                </div>
            </div>
            </NavLink>
        </>
    ))


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
            history.push(`/lists/${userId}`)
        }

    }

    return (
        <div>
            <UserListPage/>

        <div>
            Hello I am a Form

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
        </div>

    )
}

export default ListsForm;
