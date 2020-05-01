import axios from 'axios';
import cheerio from 'cheerio';

export const getMovieRaiting = async (movieId) => {
	const response = await axios.get(
		`https://www.imdb.com/title/${movieId}/?ref_=nv_sr_srsg_0`
	);
	const $ = cheerio.load(response.data);
	var domElem = $("*[itemprop = 'ratingValue']").get(0);
	return $(domElem).text();
};
