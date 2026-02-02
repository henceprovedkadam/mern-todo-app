import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from 'express'

export const verify = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  const privateKey = process.env.PRIVATE_KEY;
  if(!privateKey){
    throw new Error("PRIVATE_KEY string is undefined");
  }

  // IF NO TOKEN FOUND
  if (!token) {
    console.log("VERIFY: No token found.");
    return res.status(404).json({ msg: "No token found", success: false });
  } else {
    // TOKEN FOUND & THEN DECODING STARTS
    try {
      const decoded = jwt.verify(token, privateKey);
      console.log("VERIFY: Authorized");
      req.user = decoded;
      next();
    } catch (error) {
      console.log("VERIFY: Invalid or Expired Token");
      return res
        .status(403)
        .json({ msg: "Invalid or Expired Token", success: false });
    }
  }
};
