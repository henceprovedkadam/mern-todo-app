import express from "express";
import {
  addText,
  deleteById,
  editById,
  getAllText,
  status,
} from "../controllers/events.controllers.js";
import { verify } from "../middleware/verify.middleware.js";

const eventsRouter = express.Router();

// events
eventsRouter.post("/addtext", verify, addText);
eventsRouter.post("/getalltext", verify, getAllText);
eventsRouter.delete("/deletebyid/:id", verify, deleteById);
eventsRouter.put("/editbyid/:id", verify, editById);
eventsRouter.put("/status/:id", verify, status);

export default eventsRouter;
