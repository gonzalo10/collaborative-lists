import React, { useReducer } from 'react';

interface State {
	movies: Movie[];
}

interface Action {
	type: string;
	payload: Movie;
}
interface Movie {
	id: number;
	name: string;
}

function init(Movies: Movie[]) {
	return { movies: Movies };
}

function reducer(state: State, action: Action) {
	switch (action.type) {
		case 'increment':
			return { movies: [...state.movies, action.payload] };
		case 'decrement':
			const newMoviesList = state.movies.filter(
				(movie) => movie.id !== action.payload.id
			);
			return { movies: newMoviesList };
		default:
			throw new Error();
	}
}

const Movies: Movie[] = [{ id: 123, name: 'movie1' }];

const addMovie = (movie: Movie) => {
	return { type: 'increment', payload: movie };
};
const removeMovie = (movie: Movie) => {
	return { type: 'decrement', payload: movie };
};

function Books() {
	const [state, dispatch] = useReducer(reducer, Movies, init);
	console.log(state);
	return (
		<>
			Count:
			{state?.movies.map((movie: Movie) => (
				<div>{movie.id}</div>
			))}
			<button
				onClick={() =>
					dispatch(removeMovie({ id: state.movies[0].id, name: 'movie1' }))
				}>
				-
			</button>
			<button
				onClick={() =>
					dispatch(addMovie({ id: state.movies.length + 1, name: 'movie1' }))
				}>
				+
			</button>
		</>
	);
}

export default Books;
