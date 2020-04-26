import React, { useEffect } from 'react';

const Books: React.FC = () => {
	const handleClick = () => {};
	useEffect(() => {
		fetch('https://v2.sg.media-imdb.com/suggestion/h/house.json')
			.then((response) => response.json)
			.then((result) => console.log(result));
	}, []);
	return (
		<div>
			Books
			<button onClick={handleClick}>CreateList</button>
		</div>
	);
};

export default Books;
