import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import UserListPage from "./components/UserListPage";
import ListsForm from "./components/ListsForm";
import ListDetailPage from "./components/ListDetailPage";
import {getLists} from "./store/list"
import EditListPage from "./components/EditListPage";
import ProtectedRoute from "./components/Navigation/ProtectedRoute";
import { getAllIdeas, getIdeas } from "./store/ideas";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getLists());
    dispatch(getAllIdeas());
  }, [dispatch]);



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SignupFormPage />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          {/* <ProtectedRoute exact path="/lists/:userId">
            <UserListPage />
          </ProtectedRoute> */}
          <ProtectedRoute  exact path="/lists/:userId">
            <ListsForm />
          </ProtectedRoute>
          <ProtectedRoute exact path="/lists/page/:id">
            <ListDetailPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/lists/page/edit/:id">
            <EditListPage />
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
