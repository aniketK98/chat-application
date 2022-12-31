import React, { useEffect, useState } from "react";
import "./SidebarChats.css";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";

function SidebarChats(props) {
  const { channel, selectChat } = props;
  const [seed, setSeed] = useState("");
  const auth = useSelector((state) => state.auth);

  const otherUser =
    channel?.channelUsers?.find((user) => user?.user !== auth?.user?._id) ||
    channel;

  const lastMessage =
    channel.messages && channel.messages.length
      ? channel.messages[channel.messages.length - 1]
      : {};

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div
      className="sidebarChats"
      onClick={() => selectChat({ channel, otherUser, seed })}
    >
      {otherUser.profilePic ? (
        <Avatar src={otherUser.profilePic} />
      ) : (
        <Avatar
          src={`https://avatars.dicebear.com/api/adventurer-neutral/${seed}.svg`}
        />
      )}
      <div className="sidebarChats_text">
        <h2>{otherUser.name}</h2>
        <p>{lastMessage.text}</p>
      </div>
    </div>
  );
}

export default SidebarChats;
