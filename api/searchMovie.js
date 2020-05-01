import axios from 'axios';

module.exports = (req, res) => {
	const searchTerm = req.query.searchTerm;
	const parsedSearchTerm = searchTerm.replace(/ /g, '_');
	const firstLetter = parsedSearchTerm[0].toLowerCase();
	axios
		.get(
			`https://v2.sg.media-imdb.com/suggestion/titles/${firstLetter}/${parsedSearchTerm}.json`
		)
		.then((result) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({ results: result.data.d }));
		});
};
