import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editList } from "../../store/list";
import { useParams } from "react-router-dom";

const TYPES = [
    "Movies",
    "Books",
    "TV Shows",
    "Travel",
    "Food"
]

function EditListPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const list = useSelector(state => state.lists[id]);
    const userId = useSelector(state => state.session.user.id);


    const [title, setTitle] = useState(list.title);
    const [type, setType] = useState(list.type);
    const [errors, setErrors] = useState(['nada'])

    const updateTitle = (e) => setTitle(e.target.value)
    const updateType = (e) => setType(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUpdatedList = {
            ...list,
            title,
            type
        };

        const updatedList = await dispatch(editList(newUpdatedList))
        .catch(async (response) => {
            const data = await response.json();
            if (data && data.errors) {
                if (data.errors)
                setErrors(data.errors);
              }
        });

        if(updatedList) {
            history.push(`/lists/${userId}`)
        }

    }
    return (
        <div>This is for Editing Stuff

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
                onChange={updateTitle}
                />
            </label>
            <label>Select a Type
            <select
                onChange={updateType}
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

export default EditListPage;
