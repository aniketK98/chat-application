import express from "express";
import {
  loginUser,
  sendMessage,
  getMessages,
  createUser,
  searchUser,
} from "../controllers/userController.js";
const routes = express.Router();

routes.post("/", createUser);

routes.post("/login", loginUser);

routes.get("/:phone", searchUser);

routes.post("/api/v1/messages/new", sendMessage);

routes.get("/api/v1/messages/sync", getMessages);

export default routes;
