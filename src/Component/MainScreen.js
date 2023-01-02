import React from "react";
import Pusher from "pusher-js";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getChannels } from "../Features/messageSlice";

function MainScreen() {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [messages, setMessages] = useState();
  const [refresh, setRefresh] = useState(false);
  const auth = useSelector((state) => state.auth);
  const channels = useSelector((state) => state.message);

  useEffect(() => {
    if (!auth.user) {
      navigator("/login");
    }
    if (auth.isError) {
      console.log(auth.message);
    }
    
    dispatch(getChannels(auth?.user?._id));
  }, [auth.user, auth.isError, auth.message, navigator, refresh]);

  useEffect(() => {
    const pusher = new Pusher("82fd58c28e43b81024e2", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messagesPusher");
    channel.bind("inserted", (data) => {
      dispatch(getChannels(auth?.user?._id));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, dispatch]);

  return (
    <div className="app">
      <div className="app_container">
        <Sidebar
          channels={channels.channelData}
          setMessages={setMessages}
          refreshChat={() => {
            setRefresh(!refresh);
          }}
        />

        {messages ? <Chat selectedChat={messages} /> : <></>}
      </div>
    </div>
  );
}

export default MainScreen;
