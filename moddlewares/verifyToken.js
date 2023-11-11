//package
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

//verify a token
export const verifyToken = (req, res, next) => {
  console.log(req);
  //get token from cookie
  const { accessToken } = req.cookies;

  //check token
  if (!accessToken) {
    return res.status(400).json({ message: "Unathorized" });
  }
  //token verification
  jwt.verify(
    accessToken,
    process.env.JWT_SECRET,
    asyncHandler(async (error, decode) => {
      if (error) {
        return res.status(404).json({ message: "Invalid token!" });
      }
      next();
    })
  );
};
