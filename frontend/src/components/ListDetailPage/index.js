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
    console.log(list)
    const [modalOn, setModalOn] = useState(false);
    const [modalOn2, setEditModalOn] = useState(false);

    useEffect(() => {
        dispatch(getIdeas(id))
    }, [dispatch, id]);

    const handleModal = (e) => {
        e.preventDefault();
        setModalOn((open) => !open);
      }

    const handleModal2 = (e) => {
        e.preventDefault();
        setEditModalOn((open) => !open);
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

    // let randomIdea;
    // const randomizer = async (e) => {
    //  await ideaArr[Math.floor(Math.random() * ideaArr.length)]
    // }
    // let randomIdea = ideaArr[Math.floor(Math.random() * ideaArr.length)]
    // let randomIdea = ideasList[Math.floor(Math.random() * ideasList.length)];
    // console.log(randomIdea)

    let randomIdea = ideaArr[Math.floor(Math.random() * ideaArr.length)]
    console.log(randomIdea)




if (list) {
return (
    <div className="paper-background">
    <div className='pattern'>

        <h1 className="list-title">{list.title}</h1>
        <div className="edit-delete">
        <button onClick={deleteList}><NavLink style={{textDecoration: 'none', color: 'black'}} to={`/lists/${userId}`}>Delete</NavLink></button>
        <button onClick={handleModal2}>Edit</button>
        {modalOn2 && <EditListPage closeModal2={setEditModalOn} />}
        </div>
        <div>
        <button className="add-list" onClick={handleModal}> + add another idea</button>
        {ideasList}
        </div>
    <div>

        {modalOn && <IdeaForm closeModal={setModalOn} />}
    </div>

    <div>
       {/* {randomIdea.title} */}
    </div>

    </div>
    </div>

        )
    }
}


export default ListDetailPage;
