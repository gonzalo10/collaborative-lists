import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieList: React.FC = () => {
	let { id } = useParams();
	console.log(id);
	const addMoveToList = async () => {
		const response = await fetch('/api/addMovieToList', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				movieId: 'tt6806448',
				listId: id
			})
		});
		const parsedResponse = await response.json();
		console.log(parsedResponse);
	};
	useEffect(() => {
		addMoveToList();
	}, []);
	return (
		<div>
			<h1>Create collaborative List with one Click</h1>
		</div>
	);
};

export default MovieList;
