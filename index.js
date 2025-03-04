const express = require('express');
const app = express();

// Debug Mode

const movies = [
    {
      id: 1,
      title: "Inception",
      description: "A skilled thief steals secrets from dreams.",
      types: ["Sci-Fi"],
      averageRating: 4.5,
      reviews: [
        { id: 1, content: "Amazing movie!", rating: 5 },
        { id: 2, content: "Great visuals.", rating: 4 },
      ],
    },
];


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