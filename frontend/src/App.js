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
import IdeaDetailPage from "./components/IdeaDetailPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // dispatch(getLists());
    // dispatch(getAllIdeas());
    (async () => await dispatch(sessionActions.restoreUser()).then(async () => await dispatch(getLists())).then(async () => await dispatch(getAllIdeas()).then(() => setIsLoaded(true))))()
  }, [dispatch]);



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
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
          <ProtectedRoute exact path="/ideas/:id">
          <IdeaDetailPage />
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
