//package
import express from "express";
import {
  createNewStudent,
  deleteStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
} from "../controllers/studentController.js";
import { verifyToken } from "../moddlewares/verifyToken.js";

//init router
const router = express.Router();

//verify token as middleware
router.use(verifyToken);

//routes
router.get("/", getAllStudent);
router.post("/", createNewStudent);
router.get("/:id", getSingleStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

//export router
export default router;
