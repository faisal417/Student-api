//package
import asyncHandler from "express-async-handler";
import Hobby from "../models/Hobby.js";
import { generateSlug } from "../halper/halper.js";

/**
 * @DE GET ALL HOBBY
 * @ROUTE /api/vi/hobby
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const getAllHobby = asyncHandler(async (req, res) => {
  //get all book's data from database
  const data = await Hobby.find();
  //check that is there any hobby data
  if (!data) {
    return res.status(404).json({ message: "Data Not Found!" });
  }
  //send res
  res.status(200).json({ message: "", Hobby: data });
});

/**
 * @DE GET SINGLE HOBBY
 * @ROUTE /api/vi/hobby/:id
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const getSingleHobby = asyncHandler(async (req, res) => {
  //get slug from body
  const { slug } = req.body;
  const { id } = req.params;
  //find single hobby
  const data = await Hobby.findById(id);
  //validation
  if (!data) {
    return res.status(404).json({ message: "Data Not Found" });
  }
  //send res
  res.status(200).json({ message: "", Hobby: data });
});

/**
 * @DE CREATE NEW HOBBY
 * @ROUTE /api/vi/hobby
 * @METHOD POST
 * @ACCESS PUBLIC
 */
export const createNewHobby = asyncHandler(async (req, res) => {
  //get data from body
  const { name } = req.body;
  //validation
  if (!name) {
    return res.status(404).json({ message: "Hobby name is required!" });
  }
  //add a new book
  const data = await Hobby.create({
    name,
    slug: generateSlug(name),
  });
  //send res
  res
    .status(200)
    .json({ message: "New book data added successfully", Hobby: data });
});

/**
 * @DE UPDATE HOBBY
 * @ROUTE /api/vi/hobby/:id
 * @METHOD POST
 * @ACCESS PUBLIC
 */
export const updateHobby = asyncHandler(async (req, res) => {
  //get id from params
  const { id } = req.params;
  //get data from body
  const { name } = req.body;
  //validation
  if (!name) {
    return res.status(404).json({ message: "Name not found!" });
  }
  //find Hobby
  const data = await Hobby.findByIdAndUpdate(id, { name }, { new: true });
  //send res
  res
    .status(200)
    .json({ message: "Hobby data updated successfully!", Hobby: data });
});

/**
 * @DE DELETE HOBBY
 * @ROUTE /api/vi/hobby/:id
 * @METHOD POST
 * @ACCESS PUBLIC
 */
export const deleteHobby = asyncHandler(async (req, res) => {
  //get id from parms
  const { id } = req.params;
  //find hobby for delete
  const data = await Hobby.findByIdAndDelete(id);
  //validation
  if (!data) {
    return res.status(404).json({ message: "Data not found!" });
  }
  //send res
  res.status(200).json({ message: "Data deleted successfully!" });
});
