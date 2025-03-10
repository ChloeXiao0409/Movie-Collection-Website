const express = require('express');
const movieRouter = require('./routes/movie.router');
const app = express();
const cors = require('cors');
const corsMiddleware = require('./middleware/cors.middleware');
const v1Router = require('./routes');
// Add the middleware to parse the body of the request
app.use(express.json());
app.use(corsMiddleware); // Enable CORS for all routes

// Router
app.use("/v1", v1Router);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });