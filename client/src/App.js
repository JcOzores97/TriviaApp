import React, { useState } from 'react';
import ArtistForm from './components/artistForm/ArtistForm.js';
import Game from './components/game/Game.js';
import './App.css';

function App() {
	const [ artistName, setArtistName ] = useState(null);
	return (
		<div className="App">
			{artistName ? <Game artistName={artistName} /> : <ArtistForm setArtistName={setArtistName} />}
		</div>
	);
}
export default App;
