import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container, Typography, Avatar } from '@material-ui/core';
import useStyles from './Styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SendIcon from '@material-ui/icons/Send';
import Axios from 'axios';
import { Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function FullWidthGrid() {
  const classes = useStyles();
  const [status, Update] = React.useState(!false);
  const [data, setData] = React.useState([]);
  const [chats, setChat] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [user, setUser] = React.useState("");
  const [touser, settoUser] = React.useState("");
  const matches = useMediaQuery('(min-width:600px)');
  const [alerts, setAlerts] = React.useState(false);

  const update = (value) => {
    settoUser(value)
    localStorage.setItem("touser", JSON.stringify(value))
    var data = localStorage.getItem("user");
    Axios.post("http://localhost:5000/chat/detail", { from: JSON.parse(data).username, to: value })
      .then(res => {
        Update(!status)
        setChat(res.data)
      })
  }
  useEffect(() => {
    var value = localStorage.getItem("user")
    setUser(JSON.parse(value).username)

    if (JSON.parse(value).username === "admin") {
      Axios.get("http://localhost:5000/access/details")
        .then(res => {
          let data = res.data.filter(function (e) {
            return e.username !== "admin";
          })
          setData(data)
          if (data.length === 0) { setAlerts(true) }
        })
    }
    else {
      Axios.get("http://localhost:5000/access/details")
        .then(res => {
          let data = res.data.filter(function (e) {
            return e.username === "admin";
          })
          setData(data)
          if (data.length === 0) { setAlerts(true) }
        })
    }
    if (data.length === 0) {

    }
    setInterval(() => {
      UpdateAgain();
      CheckUser();
    }, 5000);
  }, [])

  const UpdateAgain = () => {
    var from = localStorage.getItem("user"), to = localStorage.getItem("touser");
    Axios.post("http://localhost:5000/chat/detail", { from: JSON.parse(from).username, to: JSON.parse(to) })
      .then(res => {
        setChat(res.data)
      })
    var value = localStorage.getItem("user")
    setUser(JSON.parse(value).username)

    if (JSON.parse(value).username === "admin") {
      Axios.get("http://localhost:5000/access/details")
        .then(res => {
          let data = res.data.filter(function (e) {
            return e.username !== "admin";
          })
          setData(data)
        })
    }
  }

  const CheckUser = () => {
    var value = localStorage.getItem("user")
    Axios.post("http://localhost:5000/get/status", { username: JSON.parse(value).username })
      .then(res => {
        if (!res.data.message) {
          if (JSON.parse(value).username !== "admin") {
            window.location.replace("http://localhost:3000")
          }
        }
      })
  }

  const sendMessage = () => {
    Axios.post("http://localhost:5000/chat/update", { from: user, to: touser, content: input })
      .then(res => {
        setChat(oldArray => [...oldArray, res.data])
        setInput('')
      })
  }

  const endChat = () => {
    var from = localStorage.getItem("user"), to = localStorage.getItem("touser");
    Axios.post("http://localhost:5000/chat/delete", { from: JSON.parse(from).username, to: JSON.parse(to) })
      .then(res => {
        Axios.post("http://localhost:5000/user/delete", { from: JSON.parse(from).username, to: JSON.parse(to) })
          .then(res => {
            Update(!status)
          })
      })
  }
  return (
    <div className={classes.root}>
      <Container className={classes.bodyStyle}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={matches ? 6 : 12}>
            {status ? <></> :
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Button className={classes.buttonStyle2} onClick={() => Update(!status)} variant="outlined">Back</Button>
                </Grid>
                <Grid item xs={12} sm={6} container direction="row" justify="flex-end" alignItems="center">
                  <Button className={classes.buttonStyle2} variant="outlined" onClick={() => endChat()}>End Chat</Button>
                </Grid>
              </Grid>}
            {alerts ? <Typography className={classes.TitleStyle}>NOT USERS YET</Typography> : <></>}
            <Paper className={status ? classes.paper : classes.paper1}>
              {status ?
                <>{data.map((i, j) =>
                  <Grid key={j} onClick={() => update(i.username)} className={classes.Design} container direction="row" justify="flex-start" alignItems="flex-start">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Typography className={classes.textStyle}>{i.username}</Typography>
                  </Grid>)}</> :
                <Grid className={classes.Design1} container direction="column" justify="flex-start" alignItems="flex-start">
                  {console.log(chats)}
                  {chats.map((i, j) =>
                    <Grid container direction="row" justify={i.from !== user ? "flex-start" : "flex-end"} alignItems="center" key={j} spacing={1}>
                      <Grid container direction="row" justify={i.from !== user ? "flex-start" : "flex-end"} alignItems="center" item xs={6}>
                        <Button className={classes.buttonStyle1} variant="contained" color={i.from !== user ? "secondary" : "primary"}>{i.content}</Button>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              }
            </Paper>
            <br />
            {status ? <></> :
              <FormControl className={classes.InputStyle} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Send Msg</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  placeholder="write message here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={sendMessage}
                        edge="end"
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            }
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

