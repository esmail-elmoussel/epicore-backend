const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// connect to DATABASE
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", () => console.log("connection error"));
db.once("open", () => console.log("connected successfuly"));

// end-points
app.get("/", (req, res) => {
  res.send("getting root!");
});

const discountControllers = require("./controllers");
app.use("/discount", discountControllers);

app.listen(process.env.PORT || 5000, () => {
  console.log(`app is listening to port ${process.env.PORT || 5000}`);
});
