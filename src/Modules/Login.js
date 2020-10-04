import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './Styles';
import { Grid, Container, Paper, TextField } from '@material-ui/core';
import Axios from 'axios';

export default function ButtonAppBar() {
    const classes = useStyles();
    const [input, setInput] = React.useState('');

    const submit = () => {
        if (input.length > 2) {
            Axios.post("http://localhost:5000/store/user/data", { username: input, user: false })
                .then(res => {
                    window.location.replace("http://localhost:3000/user")
                    localStorage.setItem("user", JSON.stringify(res.data))
                })
        }
    }
    return (
        <div>
            <img src={require("./images/1.jpg")} alt="bg" className="bg-dim full-bg-size" />
            <Container className={classes.body1}>
                <Paper className={classes.paper2}>
                    <Grid>
                        <center><img alt="admin" src={require("./images/admin.webp")} className={classes.imageStyle} /></center>
                        <TextField
                            id="standard-full-width"
                            label="Email Id"
                            style={{ margin: 8 }}
                            placeholder="Enter your email id"
                            margin="dense"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className={classes.InputStyle}
                        />
                        <center><Button className={classes.buttonStyle} onClick={() => submit()} variant="contained" color="primary">Login</Button></center>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}
