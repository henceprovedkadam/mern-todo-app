import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import eventsRouter from "./routes/events.routes.js";
import usersRouter from "./routes/users.routes.js";
const app = express();
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) {
    throw new Error("MONGODB_URL string is undefined");
}
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(cookieParser());
mongoose
    .connect(mongoUrl)
    .then(() => console.log("MongoDb connected."))
    .catch((error) => {
    console.error(error.message);
});
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});
app.use("/api/events", eventsRouter);
app.use("/api/users", usersRouter);
