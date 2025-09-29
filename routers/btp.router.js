const express = require("express");
const Router = express.Router();
const btpController = require("../controllers/btp.controller");
Router.get("/", btpController.returnBtp);

module.exports = Router;
