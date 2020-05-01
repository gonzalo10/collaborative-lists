import db from './db';
import axios from 'axios';

module.exports = (req, res) => {
	const listId = req.body.listId;
	db.getMovieList(listId).then((response) => {
		const movieList = response.data.movies;
		const movieTitle = response.data.title;
		const moviePromises = movieList.map((movie) => {
			return axios
				.get(`https://v2.sg.media-imdb.com/suggestion/t/${movie.movieId}.json`)
				.then((result) => ({
					...result.data.d[0],
					raiting: movie.movieRaiting
				}));
		});
		Promise.all(moviePromises).then((result) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({ movieTitle, result }));
		});
	});
};
