//package
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Student from "../models/Student.js";

/**
 * @Dec STUDENT LOGIN SYSTEM
 * @ROUTE /api/v1/login
 * @METHOD POST
 * @ACCESS PUBLIC
 */
export const loggedInStudent = asyncHandler(async (req, res) => {
  //get data from body
  const { email, password } = req.body;
  //validation
  if (!email && !password) {
    return res.status(404).json({ message: "All data required" });
  } else if (!email) {
    return res.status(404).json({ message: "Email required" });
  } else if (!password) {
    return res.status(404).json({ message: "Password required" });
  }

  //find login student
  const loginStudent = await Student.findOne({ email });

  //check user
  if (!loginStudent) {
    return res.status(404).json({ message: "Invalid email address!" });
  }
  //check password
  const passwordCheck = await bcrypt.compare(password, loginStudent.password);
  if (!passwordCheck) {
    return res.status(404).json({ message: "Password dosen't matched!" });
  }
  //access token
  const accessToken = jwt.sign(
    { email: loginStudent.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  //set cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.APP_ENV === "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  //send res
  res.status(200).json({
    message: `Hi ${loginStudent.name}, your'r loggedIn successfully`,
    Student: loginStudent,
    token: accessToken,
  });
});

/**
 * @Dec STUDENT LOGOUT SYSTEM
 * @ROUTE /api/v1/logout
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const logoutStudent = asyncHandler(async (req, res) => {
  //clear cookie
  res.clearCookie("accessToken");
  //send res
  res.status(200).json({ message: "Logout Successfully" });
});
