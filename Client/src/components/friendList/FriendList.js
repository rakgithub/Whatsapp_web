import React from "react";
import * as friendsJson from "../../friends.json";
import "./friends.css";

export class FriendsList extends React.Component {
    state = {
        friendsList: friendsJson.default.contacts,
        masterFriends: friendsJson.default.contacts
    };

    filterFriends = event => {
        let filterdFriends = this.state.masterFriends.filter(
            friend =>
                friend.name
                    .toLowerCase()
                    .indexOf(event.target.value.toLowerCase()) > -1
        );

        this.setState({ friendsList: filterdFriends });
    };
    render() {
        let friends = this.state.friendsList.map(friend => (
            <li key={friend.id}>
                <a
                    className={
                        this.props.selectedFriend === friend.id
                            ? "collection-item active"
                            : "collection-item"
                    }
                    href="#"
                    onClick={() => this.props.friendClick(friend.id)}
                >
                    {friend.name}
                </a>
            </li>
        ));
        return (
            <div className="inputWidth">
                <div className="input-field col s12">
                    <input
                        id=""
                        placeholder="search friends"
                        onChange={this.filterFriends}
                        type="text"
                        className="validate"
                    />
                </div>
                <div className="friendsList">
                    <ul className="collection">{friends}</ul>
                </div>
            </div>
        );
    }
}

export default FriendsList;
