import React, { useEffect,  useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { editIdea, removeIdea } from "../../store/ideas";


function IdeaDetailPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const idea = useSelector((state) => state.ideas[id])
    const [title, setTitle] = useState(idea.title);
    const [description, setDescription] = useState(idea.description)
    const [errors, setErrors] = useState(["nada"])
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newIdea = {
            ...idea,
            title,
            description
        }

        const updatedIdea = await dispatch(editIdea(newIdea))
        .catch(async (response) => {
            const data = await response.json()
            if (data && data.errors) {
                if (data.errors)
                setErrors(data.errors)
            }
        });

        if(updatedIdea) {
            history.push(`/lists/page/${idea.listId}`)
        }
    }

    const deleteIdea = async (e) => {
        await dispatch(removeIdea(id))
    }
    if (idea) {
    return (
        <div>
        <div>
            <h2>{idea.title}</h2>
            <div>{idea.description}</div>
            <form onSubmit={handleSubmit}>
                <label>Title
                    <input
                        type="text"
                        value={title}
                        onChange={updateTitle}
                        />
                </label>
                <label> Description
                    <input
                        type="text"
                        value={description}
                        onChange={updateDescription}
                    />
                </label>
                <button type="submit">Edit</button>
            </form>
            <button onClick={deleteIdea}><NavLink style={{textDecoration: 'none'}} to={`/lists/page/${idea.listId}`}>Delete</NavLink></button>


        </div>
        </div>
     )
    }
}

export default IdeaDetailPage;
