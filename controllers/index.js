const express = require("express");
const server = express.Router();

// require models
const Discount = require("../models/Discount");

// require controllers
const createDiscount = require("./createDiscount");

// end points
server.post("/create", createDiscount(Discount));

module.exports = server;
