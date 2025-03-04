const express = require('express');
const app = express();

// Debug Mode

app.get("/", (req, res, next) => (
    //breakpoint check
    console.log(req),
    console.log(1),
    console.log(2),
    res.json("Hello World")
));

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});