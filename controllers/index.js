const express = require("express");
const server = express.Router();

// require models
const Discount = require("../models/Discount");

// require controllers
const getCode = require("./getCode");
const createDiscount = require("./createDiscount");

// end points
server.get("/", getCode(Discount));
server.post("/create", createDiscount(Discount));

module.exports = server;
