// Read environment variables need to be at the top of the file
const config = require('./utils/config');
const cors = require('cors');
// For Cyber Security
const helmet = require("helmet");
// Morgan is for recording who is accessing the server, show the IP address, the method, the URL, the status code, the response time, and the size of the response
// const morgan = require("morgan");
const express = require('express');
const v1Router = require('./routes');
const { logger } = require('./utils/logger');
const morganMiddleware = require('./middleware/morgan.middleware');

//Why use log library -> winston - difine levels of logging / create logger file

const app = express();

app.use(helmet());
app.use(cors());
// app.use(morgan(config.NODE_ENV === "development" ? "dev" : "combined"));
app.use(morganMiddleware);
app.use(express.json());

// Router
app.use("/v1", v1Router);

// DotEnv is for this development environment
app.listen(config.PORT, () => {
  logger.info("Server is listening on the PORT: " + config.PORT);
  console.log("Environment: " + config.NODE_ENV);
});
// Different environment between development and deployment
// cross-env