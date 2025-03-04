const express = require('express');
const app = express();

// Debug Mode

app.get("/", (req, res, next) => (
    //breakpoint check
    console.log(req),
    res.json("Hello World")
));

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});