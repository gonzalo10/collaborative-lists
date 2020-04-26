import db from './db';

module.exports = (req, res) => {
	const listId = req.body.listId;
	const movieId = req.body.movieId;
	db.addMoveToList(listId, movieId).then((response) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ ...response }));
	});
};
