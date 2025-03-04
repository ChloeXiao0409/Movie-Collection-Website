const express = require('express');
const app = express();

app.get("/", (req, res, next) => (
    res.json("Hello World")
));

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});