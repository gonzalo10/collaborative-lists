import axios from 'axios';

module.exports = (req, res) => {
	const movie = req.body.movie;
	axios
		.get(`https://v2.sg.media-imdb.com/suggestion/h/${movie}.json`)
		.then((result) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({ ...result.data }));
		});
};
