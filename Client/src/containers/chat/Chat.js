import React from "react";
import "./chat.css";
import Message from "../../components/message/Message";
import FriendsList from "../../components/friendList/FriendList";
import * as commonFunctions from "../../common/common";

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000/");

class Chat extends React.Component {
    state = {
        messageList: {},
        currentMessageWindow: [],
        selectedFriend: null,
        message: "",
        enableInput: true
    };

    handleMessageChange = event => {
        this.setState({
            message: event.target.value
        });
    };

    handleSendMessageSubmit = message => {
        socket.emit("chat message", {
            id: this.state.selectedFriend,
            msg: message
        });
    };

    handleFriendClick = (id, e) => {
        let msg = this.state.messageList[id]
            ? this.state.messageList
            : {
                  ...this.state.messageList,
                  [id]: []
              };
        this.setState({
            currentMessageWindow: msg[id],
            selectedFriend: id,
            enableInput: false
        });
    };
    componentDidMount() {
        socket.on("chat message", data => {
            let msg = { ...this.state.messageList };
            let currentTime = commonFunctions.formatAMPM(new Date());
            console.log(currentTime);
            msg[data.id] = msg[data.id]
                ? [...msg[data.id], { msg: data.msg, time: currentTime }]
                : [{ msg: data.msg, time: currentTime }];
            this.setState({
                messageList: msg,
                currentMessageWindow: msg[data.id]
            });
        });
    }

    render() {
        console.log("render()");
        return (
            <div style={{ width: "100%" }}>
                <h2> Friends Chat</h2>
                <div style={{ display: "flex" }}>
                    <div className="friendList">
                        <FriendsList
                            friendClick={this.handleFriendClick}
                            selectedFriend={this.state.selectedFriend}
                        />
                    </div>
                    <div className="content">
                        <Message
                            enableInput={this.state.enableInput}
                            sendMessage={this.handleSendMessageSubmit}
                            messageChange={this.handleMessageChange}
                            sendTextMsg={this.state.currentMessageWindow}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
