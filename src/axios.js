import axios from "axios";

const instance = axios.create({
  // baseURL: "http://192.168.29.196:8001/api",
  baseURL: "https://chat-app-backend-h7mt.onrender.com/api",
});

const createUser = async (userData) => {
  return await instance.post("/users/", userData);
};

const loginUser = async (userData) => {
  return await instance.post("/users/login", userData);
};

const searchUser = async (phone) => {
  return await instance.get(`/users/${phone}`);
};

const createChannel = async (channelData, config) => {
  return await instance.post("/channels/new", channelData, config);
};
const getChannels = async (phone, config) => {
  return await instance.get(`/channels/${phone}`, config);
};

const sendMessage = async (messageData, config) => {
  return await instance.post("/channels/message", messageData, config);
};

const httpMethods = {
  createUser,
  loginUser,
  searchUser,
  getChannels,
  sendMessage,
  createChannel,
};

export default httpMethods;
