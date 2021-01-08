import React, { useReducer, useState } from 'react';
import ArtistForm from './components/artistForm/ArtistForm.js';
import Game from './components/game/Game.js';
import ErrorScreen from './components/errorScreen/ErrorScreen.js';
import Loader from './components/loader/Loader.js';
import './App.css';

function appReducer(state, action) {
	switch (action.type) {
		case 'OPTIONS_READY':
			return { ...state, gameOptions: action.payload.gameOptions, artistName: action.payload.artistName };
		case 'OPTIONS_ERROR':
			return { ...state, error: action.payload.error, artistName: action.payload.artistName };
		default:
			throw new Error('invalid action in appReducer');
	}
}
const initialState = {
	artistName: null,
	gameOptions: null,
	error: null
};

function App() {
	const [ appState, dispatch ] = useReducer(appReducer, initialState);
	const [ formSubmitted, setFormSubmitted ] = useState(false);
	return (
		<div className="App">
			{appState.gameOptions ? (
				<Game artistName={appState.artistName} gameOptions={appState.gameOptions} />
			) : appState.error ? (
				<ErrorScreen artistName={appState.artistName} type={appState.error.message} />
			) : formSubmitted ? (
				<Loader />
			) : (
				<ArtistForm appDispatch={dispatch} setFormSubmitted={setFormSubmitted} />
			)}
		</div>
	);
}
export default App;
