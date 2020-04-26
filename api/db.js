import faunadb from 'faunadb';
import dotenv from 'dotenv';

dotenv.config();

const client = new faunadb.Client({
	secret: process.env.FAUNADB_KEY
});
const q = faunadb.query;

const getMovieList = client
	.query(q.Paginate(q.Match(q.Ref('indexes/all_articles'))))
	.then((response) => {
		const notesRefs = response.data;

		const getAllProductDataQuery = notesRefs.map((ref) => {
			return q.Get(ref);
		});
		return client.query(getAllProductDataQuery).then((data) => data);
	})
	.catch((error) => console.warn('error', error.message));

const addMoveToList = (listId, movieId) =>
	client
		.query(q.Get(q.Ref(q.Collection('movie_list'), listId)))
		.then((ret) => {
			console.log(ret.data.movies);
			const movies = ret.data.movies;
			return client
				.query(
					q.Update(q.Ref(q.Collection('movie_list'), listId), {
						data: {
							movies: [...movies, movieId]
						}
					})
				)
				.then((ret) => ret);
		})
		.catch((err) => console.warn('db error', err));

const createNewList = (title = 'my movie list', movies = {}) =>
	client
		.query(
			q.Create(q.Collection('movie_list'), {
				data: {
					title: title,
					movies: movies
				}
			})
		)
		.then((ret) => ret)
		.catch((err) => console.warn('db error', err));

module.exports = {
	addMoveToList,
	createNewList,
	getMovieList
};
