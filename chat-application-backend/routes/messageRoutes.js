import express from "express";
import protectRoutes from "../middlewares/authMiddleware.js";
import {
  createChannel,
  getChannels,
  sendMessage,
} from "../controllers/messageController.js";

const routes = express.Router();
routes.get("/", protectRoutes, (req, res) => {
  res.send("sdskdj");
});

routes.post("/new", protectRoutes, createChannel);
routes.get("/:id", protectRoutes, getChannels);
routes.post("/message", protectRoutes, sendMessage);

export default routes;
