//package
import express from "express";
import {
  createNewHobby,
  deleteHobby,
  getAllHobby,
  getSingleHobby,
  updateHobby,
} from "../controllers/hobbyController.js";
import { verifyToken } from "../moddlewares/verifyToken.js";

//init router
const router = express.Router();

//verify token as middleware
router.use(verifyToken);

//routes
router.get("/", getAllHobby);
router.post("/", createNewHobby);
router.get("/:id", getSingleHobby);
router.patch("/:id", updateHobby);
router.delete("/:id", deleteHobby);

//export router
export default router;
