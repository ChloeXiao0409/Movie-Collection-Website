const cors = require('cors');
const express = require('express');
const v1Router = require('./routes');

const app = express();
// const corsMiddleware = require('./middleware/cors.middleware');

// Add the middleware to parse the body of the request
app.use(cors());
app.use(express.json());
// app.use(corsMiddleware); 

// Router
app.use("/v1", v1Router);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});