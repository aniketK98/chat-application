import httpMethods from "../axios";

const createChannel = async (channelData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await httpMethods.createChannel(channelData, config);

  return res.data;
};

const getChannels = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await httpMethods.getChannels(userId, config);

  return res.data;
};

const sendMessage = async (messageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await httpMethods.sendMessage(messageData, config);

  return res.data;
};
const messageService = {
  createChannel,
  getChannels,
  sendMessage,
};

export default messageService;
