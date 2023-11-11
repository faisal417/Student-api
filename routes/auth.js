//package
import express from "express";
import {
  loggedInStudent,
  logoutStudent,
} from "../controllers/authController.js";

//init router
const router = express.Router();

//routes
router.post("/login", loggedInStudent);
router.get("/logout", logoutStudent);

//export router
export default router;
