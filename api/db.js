import dotenv from 'dotenv';
import faunadb from 'faunadb';

dotenv.config();

const client = new faunadb.Client({
	secret: process.env.FAUNADB_KEY
});
const q = faunadb.query;

const addMoveToList = (listId, movieId) =>
	client
		.query(q.Get(q.Ref(q.Collection('movie_list'), listId)))
		.then((ret) => {
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

const getMovieList = (listId) =>
	client
		.query(q.Get(q.Ref(q.Collection('movie_list'), listId)))
		.then((res) => res);

module.exports = {
	addMoveToList,
	createNewList,
	getMovieList
};
