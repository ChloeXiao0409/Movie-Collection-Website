// Read environment variables need to be at the top of the file
// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV || "development"}`,
// });
require('dotenv').config();
const config = require('./utils/config');
const cors = require('cors');
const express = require('express');
const v1Router = require('./routes');
// const { config } = require('dotenv');

const app = express();
// const corsMiddleware = require('./middleware/cors.middleware');

// Add the middleware to parse the body of the request
app.use(cors());
app.use(express.json());
// app.use(corsMiddleware); 

// Router
app.use("/v1", v1Router);

// DotEnv is for this development environment
app.listen(config.PORT, () => {
  console.log("Server is listening on the PORT: " + config.PORT);
  console.log("Environment: " + config.NODE_ENV);
});
// Different environment between development and deployment
// cross-env