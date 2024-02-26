const { adminService } = require('../services')
const { StatusCodes } = require('http-status-codes')
const { catchedAsync } = require("../utils");
const { response } = require("../utils");

const getMovies = async (req, res) => {
	const {title} = req.query;

	const movies = title
		? await adminService.getMovieByTitle(title)
		: await adminService.getAllMovies();
	response(res, StatusCodes.OK, "All movies", movies);
};

const getMovieById = async (req, res) => {
	const { id } = req.params;

	const movie = await adminService.getMovieById(id);
	response(res, StatusCodes.OK, "Movie found", movie);
};

module.exports = {
	getMovies: catchedAsync(getMovies),
	getMovieById: catchedAsync(getMovieById),
};

