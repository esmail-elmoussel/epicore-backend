const mongoose = require("mongoose");
const config = require("../config");

// connect to DATABASE
const mongooseLoader = () => {
  mongoose.connect(config.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  const db = mongoose.connection;
  db.on("error", () => {
    throw new Error("db connection error");
  });
  db.once("open", () => console.log("db connected successfuly"));
};

module.exports = mongooseLoader;
