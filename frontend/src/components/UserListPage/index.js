import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getUserLists } from "../../store/list";
import './UserListPage.css'

function UserListPage() {
    const dispatch = useDispatch();
    const {userId} = useParams()

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
           <div className="listCard"> <NavLink style={{textDecoration: 'none'}} key={list.id} to={`/lists/page/${list.id}`}>
            <div key={list.id}>
                <div>
                    {list.title}
                </div>
            </div>
            </NavLink>
            </div>
        </>
    ))




    return (
        <div>
            <h1 className="title-line">Heres all the stuff you have to do!</h1>
            <div>{listCards}</div>
        </div>
    )


}

export default UserListPage;
