const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");

const loader = ({ app }) => {
  mongooseLoader();
  expressLoader({ app });
};

module.exports = loader;
