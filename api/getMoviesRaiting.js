import { getMovieRaiting } from './helpers';

module.exports = (req, res) => {
	const movieIdList = req.query.movieIdList;
	const moviePromises = movieIdList.map((movieId) => getMovieRaiting(movieId));

	Promise.all(moviePromises).then((result) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ movieTitle, result }));
	});
};
