import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { LoginScreen } from "../components/auth/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { startCheking } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch]);

  if (checking) {
    return <h5>Espere...</h5>;
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/login"
            exact
            component={LoginScreen}
            isAuthenticated={!!uid}
          />

          <PrivateRoute
            path="/"
            exact
            component={CalendarScreen}
            isAuthenticated={!!uid}
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
