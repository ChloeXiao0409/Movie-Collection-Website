// No changed index code for practice

const express = require('express');
const app = express();
const cors = require('cors');
// Add the middleware to parse the body of the request
app.use(express.json());
app.use(cors({origin: 'https://movie-collection-prac.netlify.app',})); // Enable CORS for all routes

// Debug Mode
app.get("/", (req, res, next) => (
    //breakpoint check
    console.log(req),
    console.log(1),
    console.log(2),
    res.json("Hello World")
));

let nextMovieId = 2;
let nextReviewId = 3;

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

// List all movies which supoort keyword search, pagination, and sorting by the average rating.
app.get("/v1/movies", (req, res, next) => {
  const {keyword, page = 1, sort, limit = 10} = req.query;

  // Filter movies by keyword
  let filterMovires = [...movies];
  if(keyword) {
    filterMovires = filterMovires.filter((movie) => movie.title.toLowerCase().includes(keyword.toLowerCase()) || movie.description.toLowerCase().includes(keyword.toLowerCase()));
  }

  // Sort movies by average rating
  if(sort === "rating") {
    filterMovires.sort((a, b) => a.averageRating - b.averageRating);
  } else if(sort === "-rating") {
    filterMovires.sort((a, b) => b.averageRating - a.averageRating);
  }

  // Pagination
  // When page 1 -> Start index is 0, end index = start index + limit = 0 + 10 = 10
  // When page 2 -> Start index is 10, end index = (page 2 - page 1) * limit = 20
  // When page 3 -> Start index is 20, end index = (page 3 - page 1) * limit = 30
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit); 
  const paginatedMovies = filterMovires.slice(startIndex, endIndex);  

  res.status(200).json(paginatedMovies);
});

// ---------------------------------------------
// Add a new movie
app.post("/v1/movies", (req, res, next) => {
  
  // Deconstructure the Data you want
  const { title, description, types } = req.body;
  
  // data validation
  if (!title || !description || !Array.isArray(types) || types.length === 0) {
    return res.status(400).json({ message: "All fileds must be required and types must be an array." });
  }

  // Create a new movie
  const newMovie = {
    id: nextMovieId++,
    title,
    description,
    types,
    averageRating: 0,
    reviews: []
  };

  // Add the new movie to the head of list
  movies.unshift(newMovie);
  // Return the new movie
  res.status(201).json(newMovie);
});

// ---------------------------------------------
// Get a movie by id
app.get("/v1/movies/:id", (req, res, next) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === parseInt(id));
  if(!movie) {
    return res.status(404).json({ message: "Movie not found."});
  }
  res.status(200).json(movie);
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// ---------------------------------------------
// Update a movie by id
app.put("/v1/movies/:id", (req, res) => {
  const { id } = req.params;
  const index = movies.findIndex((movie) => movie.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Movie not found." });
  }

  const { title, description, types } = req.body;

  // Validate `types` field
  if (types !== undefined && (!Array.isArray(types) || types.length === 0)) {
    return res.status(400).json({ message: "Types should be a non-empty array." });
  }

  // Update only provided fields
  movies[index] = {
    ...movies[index], // Keep existing values
    ...(title && { title }), // Update if provided
    ...(description && { description }),
    ...(types && { types }),
  };

  res.status(200).json(movies[index]);
});


// ---------------------------------------------
// Delete a movie by id
app.delete("/v1/movies/:id", (req, res, next) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === parseInt(id));
  if(movieIndex === -1) {
    return res.status(404).json({message: "Movie not found."});
  }
  movies.splice(movieIndex, 1);
  //No content to send back
  res.sendStatus(204);
})

// ---------------------------------------------
// Add a review to a movie and recalculate the average rating
app.post("/v1/movies/:id/reviews", (req, res, next) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === parseInt(id));
  if(!movie) {
    return res.status(404).json({ message: "Movie not found."});
  }
  
  const { content, rating } = req.body;
  if( !content || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({
      message: "Content and rating are required and rating should be between 1 and 5."
    })
  }

  const newReview = {
    id: nextReviewId++,
    content,
    rating
  }

  movie.reviews.push(newReview);
  // Update the average rating - reduce(method(), start from) -> like recursion
  movie.averageRating = +(movie.reviews.reduce((total, current) => total + current.rating, 0) / movie.reviews.length).toFixed(2);
  res.status(201).json(newReview);
});

// ---------------------------------------------
// Get all reviews of a movie
app.get("/v1/movies/:id/reviews", (req, res, next) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === parseInt(id));
  if(!movie) {
    return res.status(404).json({ message: "Movie not found."});
  }
  res.status(200).json(movie.reviews);
})