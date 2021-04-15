import React from "react";
import { Switch, Route} from "react-router-dom";
import GAuth from "../pages/SignIn";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

export default function Routes(){
    return(
        <div>
        <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={GAuth} />

              <Route path="/profile" component={Profile} isPrivate />
              <Route component={Home} />
        </Switch>
        </div>
    )
}

