const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`app is listening to port ${process.env.PORT || 5000}`);
});

const io = socket(server);
io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  socket.on("codeVerifiedSuccessfully", () => {
    io.sockets.emit("codeVerifiedSuccessfully", { message: "success" });
  });
});
