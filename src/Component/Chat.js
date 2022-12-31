import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../Features/messageSlice";

function Chat(props) {
  const dispatch = useDispatch();
  const bottomRef = useRef(null);

  const [input, setInput] = useState("");
  const [messageList, setMessageList] = useState([]);

  const { selectedChat } = props;
  const { channel, otherUser, seed } = selectedChat;
  const auth = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();

    const messageData = {
      senderId: auth?.user?._id,
      messageType: "Text",
      text: input,
      addedOn: Date.now(),
    };
    dispatch(
      sendMessage({
        channelId: channel?._id,
        messages: messageData,
      })
    );
    setMessageList((prevMsg) => {
      console.log("message updated");
      return [...prevMsg, messageData];
    });
    setInput("");
  };

  useEffect(() => {
    setMessageList(channel.messages);
  }, [channel]);

  // scroll to bottom every time messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <div className="chat">
      <div className="chat_header">
        {otherUser.profilePic ? (
          <Avatar src={otherUser.profilePic} />
        ) : (
          <Avatar
            src={`https://avatars.dicebear.com/api/adventurer-neutral/${seed}.svg`}
          />
        )}
        <div className="chat_headerInfo">
          <h3>{otherUser.name}</h3>
          <p>
            {/* Last message on {new Date(lastMessage.addedOn).toLocaleString()} */}
            Last message on{" "}
            {new Date(channel?.updatedAt).toLocaleString("en-IN")}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {/* <p className={`chat_bodyMessage ${false && "chat_bodyReceived"}`}>
          <span className="chat_bodyName">Account Name</span>
          This is a massage
          <span className="chat_bodyTime">{new Date().toUTCString()}</span>
        </p> */}

        {messageList.map((message) => (
          <p
            className={`chat_bodyMessage ${
              message.senderId === auth?.user?._id && "chat_bodyReceived"
            }`}
            key={message._id}
          >
            <span className="chat_bodyName">{message.name}</span>
            {message.text}
            <span className="chat_bodyTime">
              {new Date(message.addedOn).toLocaleString("en-IN")}
            </span>
          </p>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chats_footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form onSubmit={onSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button type="submit">send message</button>
        </form>
        <IconButton>
          <MicNoneIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
