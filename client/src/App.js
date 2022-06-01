import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chatbox from "./Chatbox";

const socket = io.connect("https://chat-dom.herokuapp.com/");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const createRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Start Chat</h3>
          <input
            type="text"
            placeholder="Enter username...."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={createRoom}>Enter Room</button>
        </div>
      ) : (
        <Chatbox socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;