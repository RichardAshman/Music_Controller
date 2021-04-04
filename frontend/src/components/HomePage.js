import React, {Component} from "react";
import JoinRoomPage from "./JoinRoomPage"
import CreateRoomPage from "./CreateRoomPage"
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom"
import Room from "./Room"
import { ButtonGroup, Button, Grid, Typography } from "@material-ui/core";

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    async componentDidMount(){
        fetch("/api/user-in-room/")
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    roomCode: data.code,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    clearRoomCode(){
        this.setState({
            roomCode: null,
        });
    }

    renderHomePage() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>
                            Join a Room
                        </Button>
                        <Button color="secondary" to="/create" component={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    render(){
        return (
            <Router>
                <switch>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return this.state.roomCode ? (
                                <Redirect to={`/room/${this.state.roomCode}`} />
                            ) : (
                                this.renderHomePage()
                            );
                        }}
                    />
                    <Route path="/join" component={JoinRoomPage} />
                    <Route path="/create" component={CreateRoomPage} />
                    <Route
                        path="/room/:roomCode"
                        render={(props) => {
                            return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
                        }}
                    />
                </switch>
            </Router>
        );
    }
}