const app = require("../../app.js");
const serverless = require("serverless-http");

exports.handler = serverless(app);
