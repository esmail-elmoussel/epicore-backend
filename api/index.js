const express = require("express");
const server = express.Router();

// require models
const Discount = require("../models/Discount");

// require controllers
const getCode = require("./getCode");
const createDiscount = require("./createDiscount");
const validateCode = require("./validateCode");

// end points
server.get("/", getCode(Discount));
server.post("/create", createDiscount(Discount));
server.post("/validate", validateCode(Discount));

module.exports = server;
