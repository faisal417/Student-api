//package
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Student from "../models/Student.js";
import { generateSlug } from "../halper/halper.js";

/**
 * @DE GET ALL STUDENT
 * @ROUTE /api/vi/student
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const getAllStudent = asyncHandler(async (req, res) => {
  //get all student's data from database
  const data = await Student.find().populate("books").populate("hobby");
  //check that is there any student data
  if (!data) {
    return res.status(404).json({ message: "Data Not Found!" });
  }
  //send res
  res.status(200).json({ message: "", Students: data });
});

/**
 * @DE GET SINGLE STUDENT
 * @ROUTE /api/vi/student/:id
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const getSingleStudent = asyncHandler(async (req, res) => {
  //get slug from body
  const { slug } = req.body;
  const { id } = req.params;
  //find single student
  const data = await Student.findById(id).populate("books").populate("hobby");
  //validation
  if (!data) {
    return res.status(404).json({ message: "Data Not Found" });
  }
  //send res
  res.status(200).json({ message: "", Student: data });
});

/**
 * @DE CREATE NEW STUDENT
 * @ROUTE /api/vi/student
 * @METHOD POST
 * @ACCESS PUBLIC
 */
export const createNewStudent = asyncHandler(async (req, res) => {
  //get data from body
  const { name, email, password, age, depertment, gender, books, hobby } =
    req.body;
  //validation
  if (!name && !email && !password) {
    return res.status(404).json({ message: "All data is required!" });
  } else if (!name) {
    return res.status(404).json({ message: "Name is required!" });
  } else if (!password) {
    return res.status(404).json({ message: "Password is required!" });
  }
  //make a hash password
  const hashPassword = await bcrypt.hash(password, 10);

  //add a new book
  const data = await Student.create({
    name,
    email,
    password: hashPassword,
    age,
    depertment,
    gender,
    books,
    hobby,
  });
  //create access token
  const token = await jwt.sign({ name, email }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
  //send res
  res.status(200).json({
    message: "New student data added successfully",
    Student: data,
    token,
  });
});

/**
 * @DE UPDATE STUDENT
 * @ROUTE /api/vi/studen/:id
 * @METHOD POST
 * @ACCESS PUBLIC
 */
export const updateStudent = asyncHandler(async (req, res) => {
  //get id from params
  const { id } = req.params;
  //get data from body
  const { name, age, depertment, gender } = req.body;

  //find Student
  const data = await Student.findByIdAndUpdate(
    id,
    { name, age, depertment, gender },
    { new: true }
  );
  //send res
  res
    .status(200)
    .json({ message: "Student data updated successfully!", Student: data });
});

/**
 * @DE DELETE STUDENT
 * @ROUTE /api/vi/student/:id
 * @METHOD POST
 * @ACCESS PUBLIC
 */
export const deleteStudent = asyncHandler(async (req, res) => {
  //get id from parms
  const { id } = req.params;
  //find student for delete
  const data = await Student.findByIdAndDelete(id);
  //validation
  if (!data) {
    return res.status(404).json({ message: "Data not found!" });
  }
  //send res
  res.status(200).json({ message: "Data deleted successfully!" });
});
