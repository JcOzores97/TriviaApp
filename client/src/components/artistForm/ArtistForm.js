import React from 'react';
import { useState } from 'react';
import './ArtistForm.css';
async function fetchArtistSongs(artistName) {
	const res = await fetch(`/api/artist/${artistName}/songs/4`);
	if (res.status === 404) throw new Error('artist not found');
	if (res.status === 500) throw new Error('server error');
	return await res.json();
}

async function fetchOptionsWithLyrics(songs, artist, optionsQuantity) {
	//artist has to be URL encoded
	const url = `api/artist/${artist}/lyrics/${optionsQuantity}`;
	const requestBody = JSON.stringify({ songs });
	const songsWithlyrics = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: requestBody
	});
	const optionsWithLyrics = await songsWithlyrics.json();
	if (optionsWithLyrics.songs.length === 0) throw new Error('Insufficient lyrics');
	return optionsWithLyrics.songs;
}

function getRoundOptions(optionWithLyrics, songs) {
	const randomSongs = getRandomElements(songs, 3);
	const randomOptions = randomSongs.map((randomSong) => {
		return { song: randomSong };
	});
	const shuffledRandomOptions = shuffleArr([ ...randomOptions, optionWithLyrics ]);
	return shuffledRandomOptions;
}
function getRandomElements(array, qty) {
	//devuelve un array de elementos random  a partir del array dado sin repetidos y con extensión indicada por qty
	const randomIndexes = getRandomNumbers(qty, array.length - 1);
	const randomElements = randomIndexes.map((randomIndex) => array[randomIndex]);
	return randomElements;
}

function getRandomNumbers(qty, maxNumber) {
	//incluye el maxNumber
	const indexes = Array.from(Array(maxNumber), (_, index) => index);
	let randomNumbers = shuffleArr(indexes);
	return randomNumbers.slice(0, qty);
}
function shuffleArr(arr) {
	//Fisher–Yates shuffle
	let shuffledArr = [ ...arr ];
	for (let i = 0; i < arr.length - 2; i++) {
		let random = Math.floor(Math.random() * (arr.length - i) + i);
		[ shuffledArr[random], shuffledArr[i] ] = [ shuffledArr[i], shuffledArr[random] ];
	}
	return shuffledArr;
}

//Component....

const ArtistForm = ({ appDispatch, setFormSubmitted }) => {
	const [ artistName, setArtistName ] = useState('');

	async function fetchGameOptions(artistName, dispatch) {
		try {
			const songs = await fetchArtistSongs(artistName.replace(' ', '%20'));
			const randomSongs = getRandomElements(songs, 12);
			const optionsWithLyrics = await fetchOptionsWithLyrics(
				randomSongs,
				artistName.toLowerCase().replace(/" "/g, ''),
				5
			);
			const optionsWithLyricsSongs = optionsWithLyrics.map((option) => option.song);
			const notFetchedSongs = songs.filter((song) => optionsWithLyricsSongs.includes(song) === false);
			const gameOptions = optionsWithLyrics.map((optionWithLyrics) =>
				getRoundOptions(optionWithLyrics, notFetchedSongs)
			);
			dispatch({ type: 'OPTIONS_READY', payload: { gameOptions, artistName } });
		} catch (error) {
			dispatch({ type: 'OPTIONS_ERROR', payload: { error, artistName } });
		}
	}

	function handleFormSubmit(ev) {
		ev.preventDefault();
		if (artistName.replace(/\s/g, '').length === 0) return;
		setFormSubmitted(true);
		fetchGameOptions(artistName, appDispatch);
	}
	return (
		<form onSubmit={handleFormSubmit} className="artist-form">
			<h2 className="artist-form__title">Trivia App</h2>
			<label className="artist-form__label" htmlFor="artist-input">
				Introduce un artista
			</label>
			<input
				id="artist-input"
				className="artist-form__input"
				type="text"
				value={artistName}
				onChange={(event) => setArtistName(event.target.value)}
			/>
			<button className={'artist-form__submit'}>Jugar!</button>
		</form>
	);
};

export default ArtistForm;
