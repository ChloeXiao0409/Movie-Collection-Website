const { createLogger } = require('../utils/logger');
const swagger = require('../utils/swagger');

// Description: Movie controller to handle the movie's request.
const logger = createLogger(__filename);

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

// ---------------------------------------------
// Add a new movie
/**
 * @swagger
 * /v1/movies:
 *   post:
 *     summary: Add a new movie
 *     description: Add a new movie to the collection.
 *     tags:
 *       - Movies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Inception"
 *               description:
 *                 type: string
 *                 example: "A skilled thief steals secrets from dreams."
 *               types:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Sci-Fi"]
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Inception"
 *                 description:
 *                   type: string
 *                   example: "A skilled thief steals secrets from dreams."
 *                 types:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Sci-Fi"]
 *                 averageRating:
 *                   type: number
 *                   format: float
 *                   example: 0
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       content:
 *                         type: string
 *                         example: "Amazing movie!"
 *                       rating:
 *                         type: integer
 *                         example: 5
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All fields must be required and types must be an array."
 */
const addMovie = (req, res, next) => {
  
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
};

// ---------------------------------------------
// Get all movies
const getAllMovies = (req, res, next) => {
    // Add info level logger for checking get all movies
    logger.info("Get all movies", {payload: {query: req.query }});

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
  
    // Add a debug level logger for checking the number of movies returned
    logger.debug("movie returned sucessfully", {payload: {count : paginatedMovies.length }});
    res.status(200).json(paginatedMovies);
};

// ---------------------------------------------
// Get a movie by id
const getMovieById = (req, res, next) => {
    const { id } = req.params;
    const movie = movies.find((movie) => movie.id === parseInt(id));
    if(!movie) {
      return res.status(404).json({ message: "Movie not found."});
    }
    res.status(200).json(movie);
};

// ---------------------------------------------
// Update a movie by id
const updateMovieById = (req, res) => {
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
};

// ---------------------------------------------
// Delete a movie by id
const deleteMovieById = (req, res, next) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex((movie) => movie.id === parseInt(id));
    if(movieIndex === -1) {
      return res.status(404).json({message: "Movie not found."});
    }
    movies.splice(movieIndex, 1);
    //No content to send back
    res.sendStatus(204);
};

// ---------------------------------------------
// Add a review to a movie and recalculate the average rating
const addReviewByMovieId = (req, res, next) => {
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
};

// ---------------------------------------------
// Get all reviews of a movie
const getReviewsByMovieId = (req, res, next) => {
    const { id } = req.params;
    const movie = movies.find((movie) => movie.id === parseInt(id));
    if(!movie) {
      return res.status(404).json({ message: "Movie not found."});
    }
    res.status(200).json(movie.reviews);
};

module.exports = {
    addMovie,
    getAllMovies,
    getMovieById,
    updateMovieById,
    deleteMovieById,
    addReviewByMovieId,
    getReviewsByMovieId
}