import React, { useEffect } from 'react';

const parseMovieTitle = (movie: string) => {
	return movie.replace(' ', '-');
};

const Books: React.FC = () => {
	const handleClick = () => {};

	const getMovieAPI = async () => {
		const response = await fetch('/api/getMovie', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				movie: parseMovieTitle('house of cards')
			})
		});
		const parsedResponse = await response.json();
		console.log({ parsedResponse });
	};
	const createMovieList = async () => {
		const response = await fetch('/api/createMovieList', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: 'Gonzalo list'
			})
		});
		const parsedResponse = await response.json();
		console.log(parsedResponse.value.id);
	};
	useEffect(() => {
		getMovieAPI();
	}, []);
	return (
		<div>
			Books
			<button onClick={createMovieList}>CreateList</button>
		</div>
	);
};

export default Books;
