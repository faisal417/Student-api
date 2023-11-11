//package
import asyncHandler from "express-async-handler";
import Book from "../models/Book.js";
import { generateSlug } from "../halper/halper.js";

/**
 * @DE GET ALL BOOK
 * @ROUTE /api/vi/book
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const getAllBooks = asyncHandler(async (req, res) => {
  //get all book's data from database
  const data = await Book.find();
  //check that is there any book data
  if (!data) {
    return res.status(404).json({ message: "Book Not Found!" });
  }
  //send res
  res.status(200).json({ message: "", Book: data });
});

/**
 * @DE GET SINGLE BOOK
 * @ROUTE /api/vi/book/:id
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const getSingleBook = asyncHandler(async (req, res) => {
  //get slug from body
  const { slug } = req.body;
  const { id } = req.params;
  //find single book
  const data = await Book.findOne({ slug });
  //validation
  if (!data) {
    return res.status(404).json({ message: "No Book Found" });
  }
  //send res
  res.status(200).json({ message: "", Book: data });
});

/**
 * @DE CREATE NEW BOOK
 * @ROUTE /api/vi/book
 * @METHOD POST
 * @ACCESS PUBLIC
 */
export const createNewBook = asyncHandler(async (req, res) => {
  //get data from body
  const { name } = req.body;
  //validation
  if (!name) {
    return res.status(404).json({ message: "Book name required!" });
  }
  //add a new book
  const data = await Book.create({
    name,
    slug: generateSlug(name),
  });
  //send res
  res
    .status(200)
    .json({ message: "New book data added successfully", Book: data });
});
