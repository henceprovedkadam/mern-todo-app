import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import eventsRouter from "./routes/events.routes.js";
import usersRouter from "./routes/users.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("MongoDb connected."))
  .catch((error) => {
    console.error(error.message);
  });

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});

app.use("/api/events", eventsRouter);
app.use("/api/users", usersRouter);
