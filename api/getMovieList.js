import db from './db';
import axios from 'axios';

module.exports = (req, res) => {
	const listId = req.body.listId;
	db.getMovieList(listId).then((response) => {
		const movieIdList = response.data.movies;

		const moviePromises = movieIdList.map((movieId) => {
			return axios
				.get(`https://v2.sg.media-imdb.com/suggestion/t/${movieId}.json`)
				.then((result) => result.data.d[0]);
		});
		Promise.all(moviePromises).then((result) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(result));
		});
	});
};
