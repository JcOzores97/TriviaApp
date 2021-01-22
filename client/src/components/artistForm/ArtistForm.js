import React from 'react';
import { useState } from 'react';
import './ArtistForm.css';
async function fetchArtistSongs(artistName) {
	const res = await fetch(`/api/artist/${artistName}/songs/4`);
	if (res.status === 404) throw new Error('artist not found');
	if (res.status === 500) throw new Error('server error');
	return await res.json();
}
function getFormattedSongs(songs) {
	const regExp = /\(|\||\bfeat\b|\bfeaturing\b|\//;
	return songs.map((song) => {
		let formattedSong = song.toLowerCase();
		const searchResult = formattedSong.search(regExp);
		if (searchResult !== -1) {
			formattedSong = formattedSong.slice(0, searchResult);
		}
		return formattedSong.trim();
	});
}

async function fetchOptionsWithLyrics(songs, artist, optionsQuantity) {
	let optionsWithLyrics = [];
	let remainingSongs = [ ...songs ];
	for (let index = 0; optionsWithLyrics.length < optionsQuantity && remainingSongs.length > 0; index++) {
		//se itera hasta que no haya más canciones para buscar letras o se haya generado la cantidad de opciones pedida
		//En cada iteración:
		//- la canción de la que se buscara letras se obtiene de songs
		//- la eliminación de aquella canción de la que se buscará letras se hace sobre remainingSongs
		try {
			const currentSong = songs[index];
			remainingSongs = remainingSongs.filter((s, ind, arr) => ind !== arr.indexOf(currentSong));
			const apiResponse = await fetch(`https://api.lyrics.ovh/v1/${artist}/${currentSong}`);
			if (!apiResponse.ok) throw new Error();
			const lyricsObject = await apiResponse.json();
			const songWithLyrics = lyricsObject.lyrics !== '' && lyricsObject.lyrics !== '[Instrumental]';
			if (!songWithLyrics) throw new Error();
			const splittedLyrics = lyricsObject.lyrics.split(/\n/).filter((chunk) => chunk !== '');
			const randomIndex = Math.floor(Math.random() * (splittedLyrics.length - 3));
			optionsWithLyrics.push({
				lyrics: [
					`"${splittedLyrics[randomIndex]}`,
					splittedLyrics[randomIndex + 1],
					`${splittedLyrics[randomIndex + 2]}"`
				],
				song: currentSong
			});
		} catch (error) {
			//se atrapa posible error para que no salte al catch exterior
			//queremos que si no se encuentra una canción, se ignore el error y se busque letra de la canción siguiente
		}
	}
	if (optionsWithLyrics.length < optionsQuantity) throw new Error('insufficient lyrics');

	return optionsWithLyrics;
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
			const formattedSongs = getFormattedSongs(songs);
			const randomSongs = getRandomElements(formattedSongs, 12);
			const optionsWithLyrics = await fetchOptionsWithLyrics(randomSongs, artistName.replace(' ', '-'), 5);
			const optionsWithLyricsSongs = optionsWithLyrics.map((option) => option.song);
			const notFetchedSongs = formattedSongs.filter((song) => optionsWithLyricsSongs.includes(song) === false);
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
