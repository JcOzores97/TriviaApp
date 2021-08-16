import React, { useState, useEffect, useContext } from 'react';
import Loader from '../loader/Loader';
import './ArtistForm.css';
import { SocketContext } from '../../contexts/socket';

function getCapitalizedString(str) {
	const words = str.split(' ');
	const capitalizedWords = words.map((word) => {
		const firstLetterUpper = word.substring(0, 1).toUpperCase();
		const withoutFirstLetter = word.substring(1, word.length);
		return `${firstLetterUpper}${withoutFirstLetter}`;
	});

	return capitalizedWords.join(' ');
}

//Component....

const ArtistForm = ({ setArtistName }) => {
	const [ selectedArtist, setSelectedArtist ] = useState('');
	const [ availableArtists, setAvailableArtists ] = useState(null);
	const socket = useContext(SocketContext);

	useEffect(() => {
		socket.once('artistsReady', (artists) => {
			setAvailableArtists(artists);
			setSelectedArtist(artists[0]);
		});

		return () => {
			socket.off('artistsReady');
		};
	}, []);

	function handleFormSubmit(ev) {
		ev.preventDefault();
		setArtistName(selectedArtist);
		socket.emit('selectedArtist', selectedArtist);
	}

	return (
		<form onSubmit={handleFormSubmit} className="artist-form">
			<h2 className="artist-form__title">Trivia App</h2>

			{availableArtists ? (
				<div className="artist-form__ready">
					<label className="artist-form__label" htmlFor="artist-input">
						Selecciona un artista
						<select
							id="artist-input"
							value={selectedArtist}
							onChange={(ev) => setSelectedArtist(ev.target.value)}
						>
							{availableArtists.map((artistName, index) => {
								return (
									<option key={index} value={artistName}>
										{/* Unable to do it with css:  */}
										{getCapitalizedString(artistName)}
									</option>
								);
							})}
						</select>
					</label>
					<button disabled={!selectedArtist} className={'artist-form__submit'}>
						Jugar!
					</button>
				</div>
			) : (
				<div className="artist-form__loading">
					<Loader />
				</div>
			)}
		</form>
	);
};

export default ArtistForm;
