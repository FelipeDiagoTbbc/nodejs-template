/* eslint-disable eqeqeq */
const movies = [
	{
		id: 1,
		title: "The Godfather",
		director: "Francis Ford Coppola",
		year: 1972,
		rating: 9.2,
	},
	{
		id: 2,
		title: "The Shawshank Redemption",
		director: "Frank Darabont",
		year: 1994,
		rating: 9.3,
	},
	{
		id: 3,
		title: "The Dark Knight",
		director: "Christopher Nolan",
		year: 2008,
		rating: 9.0,
	},
];

const getAllMovies = async () => {
	// throw new Error("Error getting movies");
	return movies;
};

const getMovieById = async (id) => {
	const movie = movies.find((movie) => movie.id == id);
	if (!movie) {
		throw new Error("Movie not found");
	}
	return movie;
};

const getMovieByTitle = async (title) => {
	const movie = movies.filter((movie) => movie.title == title);
	if (!movie) {
		throw new Error("Movie not found");
	}
	return movie;
};

module.exports = {
	getAllMovies,
	getMovieById,
	getMovieByTitle,
};
