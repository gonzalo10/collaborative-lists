import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Components/Header';
import Movies from './Pages/Movies';
import MovieList from './Pages/movie-list';
import Home from './Pages/Home';
import Books from './Pages/Books';

const AppWrapper = styled.div`
	color: ${(props) => props.theme.dark};
`;

const App = () => {
	return (
		<AppWrapper>
			<Router>
				<Header />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route exact path='/movies'>
						<Movies />
					</Route>
					<Route path='/movies/:id'>
						<MovieList />
					</Route>
					<Route path='/books'>
						<Books />
					</Route>
				</Switch>
			</Router>
		</AppWrapper>
	);
};

export default App;
