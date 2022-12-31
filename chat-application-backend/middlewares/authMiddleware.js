import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/UserModel.js";

const protectRoutes = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get and decode token
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_AUTH);

      //set req.user from db
      req.user = await UserModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized : No token");
  }
});

export default protectRoutes;
