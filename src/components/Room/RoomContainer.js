import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NewGameForm from "./NewGameForm";
import NewMessageForm from "./NewMessageForm";

class RoomContainer extends React.Component {
  render() {
    console.log("this.props from RoomContainer render ", this.props);

    const room = this.props.room;

    const paragraphs =
      Object.keys(room).length !== 0
        ? room.messages.map(message => <p key={message.id}>{message.text}</p>)
        : null;

    return (
      <div>
        <Link to="/">Back to lobby</Link>
        <aside className="chatWindow">
          <NewMessageForm
            resource="message"
            field="text"
            roomId={this.props.room.id}
          />
          {paragraphs}
        </aside>
        <section>
          <NewGameForm />
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.session.user,
    token: state.session.jwt,
    rooms: state.rooms.rooms,
    room: state.rooms.room
  };
}

export default connect(mapStateToProps)(RoomContainer);
