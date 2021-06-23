const express = require("express");
const loaders = require("./loaders");
const initializeSocket = require("./loaders/socket");
const config = require("./config");

const startServer = async () => {
  const app = express();
  await loaders({ app });

  const server = app.listen(config.PORT, () => {
    console.log(`app is listening to port ${config.PORT}`);
  });

  initializeSocket({ server });
};

startServer();
