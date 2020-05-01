import React, { useEffect, useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Search from '../Components/Search';

const MovieListWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;
const MovieWrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;

const ListTitle = styled.h1`
	text-align: center;
`;

interface OptionState {
	name: string;
	id: string;
	year: string;
	img: string;
	actors: string;
	raiting: string;
}
interface SelectedMovie {
	name: string;
	id: string;
	year: string;
	img: string;
	actors: string;
}

interface MovieListState {
	title: string;
	movies: OptionState[];
}

interface Movie {
	l: string;
	q: string;
	id: string;
	raiting: string;
	s: string;
	y: number;
	i: { imageUrl: string };
}

const loadMovieList = async (
	id: string,
	setMovieList: (props: MovieListState) => void
) => {
	const response = await fetch('/api/getMovieList', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			listId: id
		})
	});
	const movieList = await response.json();
	const parsedMovieList = parseMovieList(movieList.result);
	setMovieList({ title: movieList.movieTitle, movies: parsedMovieList });
};

const parseMovieList = (movieList: Movie[]) => {
	const parsedMovieList = movieList.map((movie) => {
		return {
			name: movie.l,
			id: movie.id,
			year: movie.y.toString(),
			img: movie.i.imageUrl,
			actors: movie.s,
			raiting: movie.raiting
		};
	});
	return parsedMovieList;
};

const MovieList: React.FC = () => {
	const [movieList, setMovieList] = useState<MovieListState | null>(null);

	const { id = '' } = useParams();
	const addMoveToList = (movieId = 'tt0325710') => {
		fetch('/api/addMovieToList', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				listId: id,
				movieId: movieId
			})
		});
	};
	const updateState = (props: MovieListState) => {
		setMovieList(props);
	};
	const handleSelectedMovie = (props: SelectedMovie) => {
		setMovieList({
			title: movieList?.title ?? '',
			movies: [...(movieList?.movies ?? []), { ...props, raiting: '' }]
		});
		addMoveToList(props.id);
		console.log(props);
	};

	const handleRemoveMovie = (movieId: string) => {
		fetch('/api/deleteMovieFromList', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				listId: id,
				movieId
			})
		});
		const updatedMovieList = movieList?.movies.filter(
			(movie) => movie.id !== movieId
		);
		setMovieList({
			title: movieList?.title ?? '',
			movies: updatedMovieList || []
		});
	};
	useEffect(() => {
		// loadMovieList(id, updateState);
	}, []);

	console.log({ movieList });

	return (
		<div>
			<ListTitle>{movieList?.title}</ListTitle>
			<Search setSelectedOption={handleSelectedMovie} />
			<MovieListWrapper>
				{movieList?.movies?.map((movie) => {
					return (
						<MovieWrapper>
							<img width=' 200px' src={movie.img} />
							<div>
								<div>{movie.name}</div>
								<div>{movie.year}</div>
								<div>{movie.raiting}</div>
								<div>{movie.actors}</div>
								<button onClick={() => handleRemoveMovie(movie.id)}>
									delete
								</button>
							</div>
						</MovieWrapper>
					);
				})}
			</MovieListWrapper>
		</div>
	);
};

export default MovieList;
