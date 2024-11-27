import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(cookieParser());
// below 2 r req. to read body from req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is now ready !!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started and listening on port ${port} !!`);
});
