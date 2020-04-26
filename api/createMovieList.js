import db from './db';

module.exports = (req, res) => {
	const title = req.body.title;
	db.createNewList(title).then((response) => {
		console.log('createMovieList', response.ref);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ ...response.ref }));
	});
};
