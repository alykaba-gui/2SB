const app = require("../server.js");
const serverless = require("serverless-http");

exports.handler = serverless(app);
