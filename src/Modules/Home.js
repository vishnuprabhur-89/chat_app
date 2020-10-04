import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './Styles';
import ChatIcon from '@material-ui/icons/Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import User from './User';
import Button from '@material-ui/core/Button';

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <Router className={classes.root}>
            <AppBar position="sticky">
                <Toolbar className={classes.toolbarStyle}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => window.location.replace("http://localhost:3000")}>
                        <ChatIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>Chat App</Typography>
                    <Button color="inherit" onClick={() => window.location.replace("http://localhost:3000")}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/user" component={User} />
            </Switch>
        </Router>
    );
}
