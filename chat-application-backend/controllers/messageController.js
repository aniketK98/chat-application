import expressAsyncHandler from "express-async-handler";
import express from "express";
import Channel from "../models/messageModel.js";

// @desc create chennel
// @route POST /api/channels/new
// @access private

const createChannel = expressAsyncHandler(async (req, res) => {
  const requestData = req.body;
  const firstUser = requestData[0];
  const secondUser = requestData[1];
  var isChannelAlreadyExist = false;
  let channelModel;
  const channelList = await Channel.find({
    "channelUsers.user": firstUser.user,
  });
  if (channelList && channelList.length) {
    channelList.forEach((channel) => {
      isChannelAlreadyExist = channel.channelUsers.find(
        (user) => user.user.toString() === secondUser.user
      );
      if (isChannelAlreadyExist) channelModel = channel;
    });
  }

  if (channelModel) return res.status(200).json(channelModel);

  channelModel = await Channel.create({ channelUsers: requestData });
  res.status(200).json(channelModel);
});

// @desc Get chennel
// @route get /api/channels/
// @access private

const getChannels = expressAsyncHandler(async (req, res) => {
  const requestData = req.params.id;
  const channels = await Channel.find({
    "channelUsers.user": requestData,
  });
  res.status(200).json(channels);
});

// @desc create message
// @route get /api/channels/message
// @access private

const sendMessage = expressAsyncHandler(async (req, res) => {
  const requestData = req.body;
  const message = await Channel.findByIdAndUpdate(
    { _id: requestData.channelId },
    { $push: { messages: requestData.messages } }
  );
  if (message) {
    res.status(200).json(message);
  } else {
    res.status(401);
    throw new Error("Message not sent");
  }
});

export { createChannel, getChannels, sendMessage };
