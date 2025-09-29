const express = require("express");
const Router = express.Router();
const logistiqueController = require("../controllers/logistique.controller");
Router.get("/", logistiqueController.returnLogistique);

module.exports = Router;
