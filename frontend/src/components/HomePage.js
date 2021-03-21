import React, {Component} from "react";
import JoinRoomPage from "./JoinRoomPage"
import CreateRoomPage from "./CreateRoomPage"
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom"


export default class HomePage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
        <Router>
            <switch>
                <Route exact path="/"><p>This is the homepage</p></Route> 
                <Route path="/join" component={JoinRoomPage} />
                <Route path="/create" component={CreateRoomPage} />
            </switch>
        </Router>
        );
    }
}