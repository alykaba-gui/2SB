const express = require("express");
const Router = express.Router();
const indexController = require("../controllers/index.controller");
Router.get("/", indexController.returnIndex);

module.exports = Router;
