import React from "react";
import { Switch, Route} from "react-router-dom";
import GAuth from "../pages/SignIn";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({});

export default function Routes(){
    const classes = useStyles();
    return(
        <div className={classes.container}>
        <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={GAuth} />

              <Route path="/profile" component={Profile} isPrivate />
              <Route component={Home} />
        </Switch>
        </div>
    )
}

