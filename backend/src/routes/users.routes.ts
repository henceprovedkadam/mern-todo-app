import express from "express";
import { login, logout, signup } from "../controllers/users.controllers.js";
import { verify } from "../middleware/verify.middleware.js";

const usersRouter = express.Router();

usersRouter.post("/signup", signup);
usersRouter.post("/login", login);
usersRouter.post("/logout", logout);

// middleware
usersRouter.get("/verify", verify, (req, res) => {
  return res.json({ user: req.user });
});

export default usersRouter;
