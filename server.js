//packages
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { mongoDBConnection } from "./config/mongoDBConnection.js";
import { errorHandler } from "./moddlewares/errorHandler.js";
import studentRouter from "./routes/student.js";
import bookRouter from "./routes/book.js";
import hobbyRouter from "./routes/hobby.js";
import authRouter from "./routes/auth.js";

//setup environment
dotenv.config();
const port = process.env.PORT || 6060;

//init express
const app = express();

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//static foler
app.use(express.static("public"));

//routes
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/hobby", hobbyRouter);
app.use("/api/v1", authRouter);

//error handler
app.use(errorHandler);

//listen server
app.listen(port, () => {
  mongoDBConnection();
  console.log(`Server is running on port ${port}`.bgGreen.black);
});
