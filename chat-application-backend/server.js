import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";
import userRoutes from "./routes/userRoutes.js";
import channelRoutes from "./routes/messageRoutes.js";
import dotenv from "dotenv";
import errorHandler from "./middlewares/ErrorMiddleware.js";

const dotenvConfig = dotenv.config();
//app config
const appConfig = Express();
const port = process.env.PORT || 8001;
const connectionUrl = process.env.MONGODB_URL;

const pusher = new Pusher({
  appId: "1512097",
  key: "82fd58c28e43b81024e2",
  secret: "7ba015efc81e0da06b73",
  cluster: "ap2",
  useTLS: true,
});

//db connect
mongoose.connect(connectionUrl);

const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to db");

  const changeStream = db.collection("channels").watch();
  //   const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType == "update") {
      const messgeDetails = change.updateDescription;
      pusher.trigger("messagesPusher", "inserted", {
        updateDetails: messgeDetails,
      });
      console.log("triggering pusher");
    } else {
      console.log("error triggering pusher");
    }
  });
});

//middleware

appConfig.use(Express.json());
appConfig.use(
  Express.urlencoded({
    extended: false,
  })
);
appConfig.use(cors());

//api end points
appConfig.use("/api/users", userRoutes);
appConfig.use("/api/channels", channelRoutes);
appConfig.use(errorHandler);

//port listners
appConfig.listen(port, () => console.log(`listening to ${port}`));
