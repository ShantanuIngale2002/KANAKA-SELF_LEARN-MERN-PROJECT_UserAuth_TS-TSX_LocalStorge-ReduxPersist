// we are generating cookie after login/register - to make use of it this is used.

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt; // since we named cookie 'jwt'
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // in generateToken() we passed {userId} obj to jwt.sign()
      req.user = await User.findById(decoded.userId).select("-password"); // exclude password
      next();
    } catch {
      res.status(401);
      throw new Error("Not authorized, Invalid token !!"); // token present but is invalid
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, No token !!"); // if token
  }
});

export { protect };
