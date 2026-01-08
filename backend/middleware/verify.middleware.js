import jwt from "jsonwebtoken";

export const verify = async (req, res, next) => {
  const token = req.cookies.token;

  // IF NO TOKEN FOUND
  if (!token) {
    console.log("VERIFY: No token found.");
    return res.status(404).json({ msg: "No token found", success: false });
  } else {
    // TOKEN FOUND & THEN DECODING STARTS
    try {
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
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
