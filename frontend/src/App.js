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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getLists());
  }, [dispatch]);

  // useEffect(() => {
  //   (async () => {
  //     await dispatch(getLists());



  //   })();
  // }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/lists/:userId">
            <UserListPage />
          </Route>
          <Route  exact path="/lists">
            <ListsForm />
          </Route>
          <Route exact path="/lists/page/:id">
            <ListDetailPage />
          </Route>
          <Route exact path="/lists/page/edit/:id">
            <EditListPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
