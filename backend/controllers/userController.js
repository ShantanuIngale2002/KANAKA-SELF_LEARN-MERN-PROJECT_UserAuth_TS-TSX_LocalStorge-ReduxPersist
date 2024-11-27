import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists && (await userExists.matchPassword(password))) {
    generateToken(res, userExists._id);
    res.status(201).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password !!");
  }
});

// @desc    Register a new user
// route    POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data !!");
  }

  res.status(200).json({ message: "Register User" });
});

// @desc    Logout a user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  // to logout just make cookie empty and expired at date right away.
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: `User logged out !!` });
});

// @desc    Get user's progile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json({ user });
});

// @desc    Update user's profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  let passUpdated = false;
  await User.findById(req.user._id)
    .then(async (userToUpdate) => {
      userToUpdate.email = req.body.email || userToUpdate.email;
      userToUpdate.name = req.body.name || userToUpdate.name;
      if (req.body.password) {
        userToUpdate.password = req.body.password;
        passUpdated = true;
      }
      return await userToUpdate.save();
    })
    .then((userUpdated) => {
      res.status(200).json({
        id: userUpdated._id,
        name: userUpdated.name,
        email: userUpdated.email,
        passwordUpdate: passUpdated,
      });
    })
    .catch(() => {
      res.status(400);
      throw new Error("User not found !!");
    });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
