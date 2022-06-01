import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chatbox({ socket, username, room }) {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  const sendMessage = async () => {
    if (msg !== "") {
      const messageInfo = {
        room: room,
        user: username,
        msg: msg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageInfo);
      setMsgList((list) => [...list, messageInfo]);
      setMsg("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsgList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header ">
        <p>Chatbox</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {msgList.map((messageContent,i) => {
            return (
              <div
                className="message"
                id={username === messageContent.user ? "you" : "other"}
                key={i}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.msg}</p>
                  </div>
                  <div className="message-meta">
                    <p id="user">{messageContent.user}</p>
                    <p id="time">{messageContent.time}</p>
                  </div>
                  </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={msg}
          placeholder="Start chatting..."
          onChange={(event) => {
            setMsg(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button  onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chatbox;