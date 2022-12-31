import dbSchema from "../dbSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

const sendMessage = (req, res) => {
  const dbInsert = req.body;
  dbSchema.create(dbInsert, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
};

const getMessages = (req, res) => {
  dbSchema.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

// @desc create user
// @route POST /api/users/
// @access public
const createUser = asyncHandler(async (req, res) => {
  const { phoneNumber, password, name, profilePic } = req.body;

  if (!phoneNumber || !password || !name) {
    res.status(401);
    throw new Error("Please provide all the fields");
  }

  const user = await User.findOne({ phoneNumber });
  if (user) {
    res.status(401);
    throw new Error("User Already Exists, please login");
  }

  //hash password
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    phoneNumber,
    password: hashPassword,
    profilePic,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      phoneNumber: newUser.phoneNumber,
      name: newUser.name,
      profilePic: newUser.profilePic,
      token: jwtGenerator(newUser._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
});

// @desc login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    res.status(401);
    throw new Error("Please provide all the fields");
  }
  const user = await User.findOne({ phoneNumber });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      phoneNumber: user.phoneNumber,
      name: user.name,
      profilePic: user.profilePic,
      token: jwtGenerator(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc search user
// @route GET /api/users/:phone
// @access public
const searchUser = asyncHandler(async (req, res) => {
  const phoneNumber = req.params.phone;

  if (!phoneNumber) {
    res.status(401);
    throw new Error("Please provide all the fields");
  }

  const user = await User.find(
    { phoneNumber: { $regex: "^" + phoneNumber + "" } },
    "-password"
  );

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const jwtGenerator = (id) => {
  return jwt.sign({ id }, process.env.JWT_AUTH, {
    expiresIn: "30d",
  });
};
export { loginUser, sendMessage, getMessages, createUser, searchUser };
