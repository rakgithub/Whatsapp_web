import React from "react";
import "./message.css";
import PropTypes from "prop-types";

class Message extends React.Component {
    state = { message: "", enableSendButton: true };

    handleMsgChange = e =>
        this.setState({ message: e.target.value, enableSendButton: false });

    handleSendMessage = () => {
        this.props.sendMessage(this.state.message);
        this.setState({ message: "" });
    };

    handleKeyPress = event => {
        if (event.keyCode === 13) {
            this.props.sendMessage(this.state.message);
            this.setState({ message: "" });
        }
    };

    render() {
        let key = 0;
        const messages = this.props.sendTextMsg
            ? this.props.sendTextMsg.map(message => (
                  <div key={key++} className="container">
                      <p>{message.msg}</p>
                      <span className="time-right">{message.time}</span>
                  </div>
              ))
            : [];
        return (
            <div>
                {messages}
                <div className="floadRight">
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="inputMsg"
                                disabled={this.props.enableInput}
                                value={this.state.message}
                                onChange={this.handleMsgChange}
                                type="text"
                                className="validate"
                                onKeyDown={this.handleKeyPress}
                            />
                        </div>
                        <button
                            onClick={this.handleSendMessage}
                            disabled={this.props.enableInput}
                            className="btn"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Message.propTypes = {
    messageChange: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    sendTextMsg: PropTypes.array.isRequired,
    enableInput: PropTypes.bool.isRequired
};

export default Message;
