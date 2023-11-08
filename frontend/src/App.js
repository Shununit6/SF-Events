import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Groups from "./components/Groups";
import GroupDetails from "./components/GroupDetails";
// import Home from "./components/Home";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path="/">
            <h1>San Francisco Event</h1>
          </Route>
          <Route exact path="/groups">
            <Groups/>
          </Route>
          <Route path="/groups/:groupId">
            <GroupDetails />
          </Route>
          {/* <Route exact path="/" component={Home} /> */}
          {/* <Route path="/groups/new" component={CreateGroupForm} /> */}
          {/* <Route exact path="/">
            <h1>San Francisco Event</h1>
          </Route>
          <Route path="/groups" component={Groups} />
          <Route path="/groups/:groupId" component={GroupDetails} /> */}
        </Switch>}
    </>
  );
}

export default App;
