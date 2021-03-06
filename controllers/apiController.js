const fetch = require('node-fetch');
const dotenv = require('dotenv');
const btoa = require('btoa');
dotenv.config();
let apiController = {};
apiController.sendSongsFromRandomAlbums = async (artistName, maxAlbums, res) => {
	//devuelve los nombres de las canciones de una serie de álbumes del artistName dado.
	//esos álbumes son escogidos al azar y su cantidad máxima depende de maxAlbums
	//*se habla de cantidad máxima porque un artista podría no llegar a tener tantos álbumes como maxAlbums indique
	const accessToken = await fetchAccessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
	const artistInfo = await fetchArtistInfo(accessToken, artistName);
	const albumsInfo = await fetchAlbumsInfo(accessToken, artistInfo.artists.items[0].id);
	const uniqueAlbums = getUniqueAlbums(albumsInfo.items);
	const filteredAlbums = getFilteredAlbums(uniqueAlbums);
	const randomFilteredAlbums = getMaxNumberOfRandomAlbums(
		filteredAlbums,
		maxAlbums <= 0 ? filteredAlbums.length : maxAlbums
	);
	const tracksInfo = await fetchTracksInfo(accessToken, randomFilteredAlbums);
	const trackNames = getTrackNames(tracksInfo);
	const filteredTrackNames = getFilteredTrackNames(trackNames);
	//eliminación de duplicados (canciones de versiones deluxe)
	const uniqueTrackNames = [ ...new Set(filteredTrackNames) ];
	res.status(200).send(uniqueTrackNames);
};

//FUNCIONES

function fetchAccessToken(clientID, clientSecret) {
	const options = {
		method: 'POST',
		body: 'grant_type=client_credentials',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + btoa(clientID + ':' + clientSecret)
		}
	};
	return fetch('https://accounts.spotify.com/api/token', options)
		.then((res) => res.json())
		.then((tokenInfo) => tokenInfo.access_token);
}

function fetchArtistInfo(accessToken, artistName) {
	const options = {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	};
	let url = `https://api.spotify.com/v1/search?q=${artistName.replace(' ', '%20')}&type=artist&limit=1`;

	return fetch(url, options).then((res) => res.json()).then((data) => {
		if (data.artists.items.length === 0 || artistName.toLowerCase() !== data.artists.items[0].name.toLowerCase()) {
			throw new Error('artist not found');
		} else {
			return data;
		}
	});
}

function fetchAlbumsInfo(accessToken, artistId) {
	const url = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=AR`;
	const options = {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	};
	return fetch(url, options).then((res) => res.json());
}

function fetchTracksInfo(accessToken, albumsInfo) {
	const options = {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	};
	let promises = albumsInfo.map((albumInfo) => {
		return fetch(`https://api.spotify.com/v1/albums/${albumInfo.id}/tracks`, options);
	});

	return Promise.all(promises).then((responses) => {
		return Promise.all(responses.map((response) => response.json()));
	});
}

function getUniqueAlbums(albumsList) {
	//para contrarestar albumes repetidos que a veces devuelve la api de spotify
	const albumsNames = albumsList.map((album) => album.name);
	const uniqueAlbumsNames = [ ...new Set(albumsNames) ];
	const uniqueAlbums = uniqueAlbumsNames.map((albumName) => {
		return albumsList.find((albumObject) => albumObject.name === albumName);
	});
	return uniqueAlbums;
}

function getTrackNames(albumsList) {
	const trackNames = albumsList.flatMap((album) => {
		return album.items.map((track) => track.name);
	});
	return trackNames;
}

function getFilteredAlbums(albumsList) {
	//quitar de la lista de álbumes los que son no deseables. Es decir, aquellos cuyas canciones
	// tengan bajas probabilidades de contener lyrics
	const filteredAlbums = albumsList.filter((album) => {
		return /instrumental|Beats|karaoke|remix|live|tour|sessions/gi.test(album.name) === false;
	});
	return filteredAlbums;
}

function getMaxNumberOfRandomAlbums(albums, maxAlbumQty) {
	if (albums.length <= maxAlbumQty) {
		return albums;
	} else {
		const randomNumbers = getRandomNumbers(maxAlbumQty, albums.length - 1);
		const randomAlbums = randomNumbers.map((randomNumber) => albums[randomNumber]);
		return randomAlbums;
	}
}
function getRandomNumbers(qty, maxNumber) {
	//(incluye el maxNumber)
	const indexes = Array.from(Array(maxNumber), (_, index) => index);
	const randomNumbers = shuffleArr(indexes);
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

function getFilteredTrackNames(trackNames) {
	//quitar de los resultados las canciones cuyo nombre indiquen versiones no deseables
	const filteredNames = trackNames.filter((trackName) => {
		return /karaoke|commentary|instrumental|sessions|remix/gi.test(trackName) === false;
	});
	return filteredNames;
}
module.exports = apiController;
