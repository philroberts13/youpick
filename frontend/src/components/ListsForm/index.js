import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import { createList } from "../../store/list";
import { NavLink } from "react-router-dom";
import { getUserLists } from "../../store/list";
import UserListPage from "../UserListPage";
import ListsFormModal from "./form";


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
    const [errors, setErrors] = useState(['nada']);
    const [modalOn, setModalOn] = useState(false)



    useEffect(() => {
        dispatch(getUserLists(userId))
    }, [dispatch]);

    const handleModal = (e) => {
        e.preventDefault();
        setModalOn((open) => !open);
      }


        return (
        <div className="paper-background">
        <div className="pattern">
            <UserListPage/>

        <button onClick={handleModal}>Add another list</button>
        {modalOn && <ListsFormModal closeModal={setModalOn} />}
        </div>
        </div>

    )
}

export default ListsForm;
