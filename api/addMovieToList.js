import db from './db';
import { getMovieRaiting } from './helpers';

module.exports = (req, res) => {
	const listId = req.body.listId;
	const movieId = req.body.movieId;

	getMovieRaiting(movieId).then((movieRaiting) => {
		db.addMoveToList(listId, movieId, movieRaiting).then((response) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({ ...response }));
		});
	});
};
