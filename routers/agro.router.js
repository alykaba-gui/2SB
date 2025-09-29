const express = require("express");
const Router = express.Router();
const agroController = require("../controllers/agro.controller");
Router.get("/", agroController.returnAgro);

module.exports = Router;
