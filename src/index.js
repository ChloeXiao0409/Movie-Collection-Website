// Read environment variables need to be at the top of the file
const config = require('./utils/config');
const cors = require('cors');
// For Cyber Security
const helmet = require("helmet");
const express = require('express');
const v1Router = require('./routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Router
app.use("/v1", v1Router);

// DotEnv is for this development environment
app.listen(config.PORT, () => {
  console.log("Server is listening on the PORT: " + config.PORT);
  console.log("Environment: " + config.NODE_ENV);
});
// Different environment between development and deployment
// cross-env