const {Router} = require("express");
const { getAllMovies, addMovie, getMovieById, updateMovieById, deleteMovieById, addReviewByMovieId, getReviewsByMovieId } = require("../controllers/movie.controller");

const movieRouter = Router();

// List all movies which supoort keyword search, pagination, and sorting by the average rating.
movieRouter.get("", getAllMovies);

// ---------------------------------------------
// Add a new movie
movieRouter.post("", addMovie);

// ---------------------------------------------
// Get a movie by id
movieRouter.get("/:id", getMovieById);

// ---------------------------------------------
// Update a movie by id
movieRouter.put("/:id", updateMovieById);

// ---------------------------------------------
// Delete a movie by id
movieRouter.delete("/:id", deleteMovieById);

// ---------------------------------------------
// Add a review to a movie and recalculate the average rating
movieRouter.post("/:id/reviews", addReviewByMovieId);

// ---------------------------------------------
// Get all reviews of a movie
movieRouter.get("/:id/reviews", getReviewsByMovieId);

module.exports = movieRouter;
// Then need to connect with application