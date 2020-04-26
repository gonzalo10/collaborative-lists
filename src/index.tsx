import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import * as serviceWorker from './serviceWorker';

const theme = {
	light: {
		main: '#3f72af',
		light: '#f9f7f7',
		mid: '#dbe2ef',
		dark: '#1F4D8F'
	}
};

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme.light}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
