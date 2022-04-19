import React, { useEffect,  useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getIdea, editIdea, removeIdea } from "../../store/ideas";
import { getListById } from "../../store/list";
import './IdeaDetail.css'


function IdeaDetailPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const idea = useSelector(state => state.ideas[id])
    const listId = idea.listId
    useEffect(() => {
        dispatch(getIdea(id))
        dispatch(getListById(listId))
    }, [dispatch, id]);

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

    console.log(idea === true)

    const deleteIdea = async (e) => {
        await dispatch(removeIdea(id))
    }
    if (idea) {
    return (
        <div className="paper-background-idea">
        <div className="pattern-idea">
            <h2 className="idea-title">{idea.title}</h2>
            {/* <div>{idea.description}</div> */}
            <form className="idea-form" onSubmit={handleSubmit}>
                <label>Title...
                    <input
                        type="textarea"
                        value={title}
                        onChange={updateTitle}
                        />
                </label>
                <label> Description...
                    <input
                        type="textarea"
                        value={description}
                        onChange={updateDescription}
                    />
                </label>
                <button className="edit-button" type="submit">Confirm</button>
            <button onClick={deleteIdea}><NavLink style={{textDecoration: 'none', color: "red"}} to={`/lists/page/${idea.listId}`}>Delete</NavLink></button>
            <button><NavLink style={{textDecoration: 'none', color: "blue"}} to={`/lists/page/${idea.listId}`}>Go Back!</NavLink></button>
            </form>


        </div>
        </div>
     )
    }
}

export default IdeaDetailPage;
