import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const parseMovieTitle = (movie: string) => {
	return movie.replace(' ', '-');
};

const loadMovieList = async (
	id: string,
	setMovieList: React.Dispatch<React.SetStateAction<Object[]>>
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
	const parsedResponse = await response.json();
	console.log({ parsedResponse });
};

const MovieList: React.FC = () => {
	const [moveList, setMovieList] = useState<Array<Object>>([]);
	const { id = '' } = useParams();
	const addMoveToList = async () => {
		const response = await fetch('/api/addMovieToList', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				listId: id
			})
		});
		const parsedResponse = await response.json();
		console.log(parsedResponse);
	};
	useEffect(() => {
		// addMoveToList();
		loadMovieList(id, setMovieList);
	}, []);

	console.log({ moveList });
	return (
		<div>
			<h1>Create collaborative List with one Click</h1>
		</div>
	);
};

export default MovieList;
