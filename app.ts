import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import path from "path";

import studentRoutes from "./routes/student-routes";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/students", studentRoutes);

mongoose
  .connect("mongodb://localhost:27017/exampleDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error middleware:", err);
    return res.status(400).render("error");
  }
);

app.listen(1140, () => {
  console.log("Server is listening on port 1140...");
});
