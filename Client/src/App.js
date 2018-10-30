import React, { Component } from "react";
import "./App.css";
import Chat from "./containers/chat/Chat";
import "materialize-css/dist/css/materialize.min.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Chat />
            </div>
        );
    }
}

export default App;
