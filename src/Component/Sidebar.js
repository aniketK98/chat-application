import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChats from "./SidebarChats";
import { useDispatch, useSelector } from "react-redux";
import httpMethods from "../axios";
import { createChannel, getChannels } from "../Features/messageSlice";
import { toast } from "react-toastify";
import { logout } from "../Features/authSlice";

function Sidebar(props) {
  const { channels, setMessages, refreshChat } = props;
  const [seed, setSeed] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const searchUser = async (e) => {
    setSearchInput(e.target.value);
    const result = await httpMethods.searchUser(searchInput);
    setSearchResult(result.data);
  };

  const createChat = (userData) => {
    setSearchInput("");
    dispatch(
      createChannel([
        {
          user: auth?.user?._id,
          name: auth?.user?.name,
          profilePic: auth?.user?.profilePic && "",
        },
        {
          user: userData._id,
          name: userData.name,
          profilePic: userData.profilePic,
        },
      ])
    );
    dispatch(getChannels(auth?.user?._id));
    setSearchResult();
    refreshChat();
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_profile">
          {/* <Avatar alt={auth?.user?.name} src="/static/images/avatar/1.jpg" /> */}
          {auth?.user?.profilePic ? (
            <Avatar src={auth?.user?.profilePic} />
          ) : (
            <Avatar
              src={`https://avatars.dicebear.com/api/adventurer-neutral/${seed}.svg`}
            />
          )}
          <h3>{auth?.user?.name}</h3>
        </div>
        <div className="sidebar_headerRight">
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              toast("🔜 Coming Soon", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }}
          >
            <DonutLargeIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(logout());
            }}
          >
            <LogoutIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_searchBar">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon />
          <input
            placeholder="Search using phone..."
            type="text"
            value={searchInput}
            onChange={searchUser}
          />
        </div>
      </div>
      {searchResult &&
        searchResult.map((user) => (
          <div className="sidebarChats" onClick={() => createChat(user)}>
            {user.profilePic ? (
              <Avatar src={user.profilePic} />
            ) : (
              <Avatar
                src={`https://avatars.dicebear.com/api/adventurer-neutral/${seed}.svg`}
              />
            )}
            <div className="sidebarChats_text">
              <h2>{user.name}</h2>
            </div>
          </div>
        ))}
      <div className="sidebar_chats">
        {channels?.map((channel) => (
          <SidebarChats
            channel={channel}
            selectChat={setMessages}
            key={channel._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
