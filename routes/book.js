//package
import express from "express";
import {
  createNewBook,
  getAllBooks,
  getSingleBook,
} from "../controllers/bookController.js";
import { verifyToken } from "../moddlewares/verifyToken.js";

//init router
const router = express.Router();

//verify token as middleware
router.use(verifyToken);

//routes
router.get("/", getAllBooks);
router.post("/", createNewBook);
router.get("/:slug", getSingleBook);

//export router
export default router;
