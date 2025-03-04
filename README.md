npx kill-port 3000

##Project requirements: Movie Management System##
Basics: Movies
• The list page lists all movies, supports keyword search and can be sorted by ratings, allowing paging queries.
• Single movie details page
• Allows to add a new movie
• Allows modification of movie information.
• Allows deletion of movies.
Extended section: Reviews
• Add a comment to the movie and record the rating.
• Get all comments for a movie.

  GET /v1/movies - 200
    query: limit (pageSize) = 10 | page = 1,2,3 | sort = rating,-rating | keyword (q) = abc |
  POST /v1/movies - 201
  GET /v1/movies/:id - 200
  PUT /v1/movies/:id - 200
  DELETE /v1/movies/:id - 204
  POST /v1/movies/:id/reviews - 201
  GET /v1/movies/:id/reviews - 200

The Movie Format：
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
