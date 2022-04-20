import React, { useEffect,  useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getIdeas, createIdea, removeIdea } from "../../store/ideas";
import { removeList, getListById, editList } from "../../store/list";
import EditListPage from "../EditListPage";
import IdeaForm from "../IdeaForm";
import './ListDetail.css'

function ListDetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const userId = useSelector(state => state.session.user.id);
    const ideas = useSelector(state => state.ideas)
    const list = useSelector(state => state.lists[+id]);
    const [loaded, setLoaded] = useState(false);
    const [modalOn, setModalOn] = useState(false);
    const [modalOn2, setEditModalOn] = useState(false);
    const [modalOn3, setIdeaModalOn] = useState(false);

    useEffect(() => {
        (async () => await dispatch(getIdeas(id)).then(() => setLoaded(true)))()
    }, [dispatch, id]);

    if (!loaded) return null;
    const handleModal = (e) => {
        e.preventDefault();
        setModalOn((open) => !open);
      }

    const handleModal2 = (e) => {
        e.preventDefault();
        setEditModalOn((open) => !open);
      }

      const handleModal3 = (e) => {
        e.preventDefault();
        setIdeaModalOn((open) => !open);
      }


    const deleteList = async (e) => {
        await dispatch(removeList(id))
    }


    let ideasList = Object.values(ideas)?.map(idea => (
        <div className="ideaCard" key={idea.id}>
           <NavLink style={{textDecoration: 'none', color: "blue"}} to={`/ideas/${idea.id}`} >{idea.title}--> {idea.description}</NavLink>
        </div>
        ))

    const ideaArr = Object.values(ideas)

    let randomIdea = ideaArr[Math.floor(Math.random() * ideaArr.length)]

    let randomizerButton;

    if (ideaArr.length >= 1) {
        randomizerButton = (
        <>
        <button className="random-idea-title" onClick={handleModal3}>Can't decide what's next?</button>
        </>
        )
    }



if (list) {
return (
    <div className="paper-background">
    <div className='pattern'>

        <h1 className="list-title">{list.title}</h1>
        <div className="edit-delete">
        <button onClick={deleteList}><NavLink style={{textDecoration: 'none', color: 'red'}} to={`/lists/${userId}`}>Delete</NavLink></button>
        <button className="link-button" onClick={handleModal2}>Edit</button>
        {modalOn2 && <EditListPage closeModal2={setEditModalOn} />}
        </div>
        <div>
        <div>
            {randomizerButton}
            {modalOn3 && <button closeModal3={setIdeaModalOn}>
                <div className="random-idea-modal"><div className="random-idea">{randomIdea.title}</div></div>
                <button className="cancel" onClick={() => setIdeaModalOn(false)}>close</button>
            </button>}
        </div>
        {ideasList}
        </div>
        <button className="add-list" onClick={handleModal}> + add an idea</button>
    <div>

        {modalOn && <IdeaForm closeModal={setModalOn} />}
    </div>



    </div>
    </div>

        )
    }
}


export default ListDetailPage;
