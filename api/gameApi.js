const io = require('socket.io')();
const { getRandomElements, getRandomNumbers, shuffleArr } = require('../utils/utils.js');
const events = require('events');
const admin = require('firebase-admin');
admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://trivia-app-946d2.firebaseio.com'
});

const db = admin.firestore();

const gameApi = {
	io: io
};

const gameConfig = {
	secondsPerRound: 45,
	roundsQuantity: 5
};

//socket events to emit:
//newRound
//secondsRemainingUpdate
//gameOver
//artistsReady

//socket events to listen :
//selectedOption
//selectedArtist (only one time)

io.on('connection', async function(socket) {
	const eventEmitter = new events.EventEmitter();
	const availableArtists = await getAvailableArtists();
	const availableArtistsNames = availableArtists.map((artist) => artist.name);

	socket.emit('artistsReady', availableArtistsNames);

	socket.once('selectedArtist', (selectedArtist) => {
		const selectedArtistId = getArtistId(selectedArtist, availableArtists).toString();
		eventEmitter.emit('gameStart', selectedArtistId);
	});

	let secondsRemaining = gameConfig.secondsPerRound;
	let currentRound = 1;
	let score = 0;
	let roundAttempts = 0;
	let options = null;
	let timerId = null;

	eventEmitter.once('gameStart', handleGameStart);

	eventEmitter.on('newRound', handleNewRound);

	eventEmitter.on('roundEnd', handleRoundEnd);

	eventEmitter.once('gameOver', handleGameOver);

	async function handleGameStart(artistId) {
		options = await getGameOptions(artistId, gameConfig.roundsQuantity);

		socket.on('selectedOption', (clientData) => {
			const correctOption = options[currentRound - 1].correctOption;

			if (clientData.answer === correctOption) {
				eventEmitter.emit('roundEnd', false);
			} else {
				roundAttempts++;
			}
		});
		eventEmitter.emit('newRound');
	}

	function handleNewRound() {
		const timer = setInterval(() => {
			secondsRemaining--;
			socket.emit('secondsRemainingUpdate', secondsRemaining);
			if (secondsRemaining === 0) {
				eventEmitter.emit('roundEnd', true);
			}
		}, 1000);

		timerId = timer;

		socket.emit('newRound', {
			currentRound,
			roundOptions: options[currentRound - 1].options,
			roundLyrics: options[currentRound - 1].lyrics,
			score
		});
	}

	function handleRoundEnd(endedByTimeover) {
		clearInterval(timerId);

		roundAttempts++;
		score = score + (endedByTimeover ? getRoundScore(roundAttempts, true) : getRoundScore(roundAttempts, false));
		if (currentRound === gameConfig.roundsQuantity) {
			eventEmitter.emit('gameOver');
		} else {
			currentRound++;
			eventEmitter.emit('newRound');
		}

		secondsRemaining = gameConfig.secondsPerRound;
		roundAttempts = 0;
	}

	function handleGameOver() {
		socket.emit('gameOver', { totalScore: score });
	}
});

function getRoundScore(attempts, timeIsOver) {
	if (timeIsOver) return 0;
	if (attempts === 1) return 10;
	return 10 - attempts * 2;
}

async function getAvailableArtists() {
	const docRef = db.collection('gameInfo').doc('artists');
	const doc = await docRef.get();
	const docData = doc.data();
	return docData.available;
}

function getArtistId(artistName, artistsList) {
	return artistsList.find((artist) => artist.name === artistName).id;
}

async function getGameOptions(artistId, roundsQuantity) {
	const { trackNames, tracksWithLyricsQuantity } = await getArtistInfo(artistId);
	const randomIndexes = getRandomNumbers(roundsQuantity, tracksWithLyricsQuantity - 1);
	const promisesArr = randomIndexes.map((randomIndex) => getSongWithLyrics(artistId, randomIndex.toString()));
	const documents = await Promise.all(promisesArr);
	const songsWithLyrics = documents.map((doc) => doc.data());
	const songsWithLyricsNames = songsWithLyrics.map((song) => song.name);

	const filteredTrackNames = trackNames.filter((track) => !songsWithLyricsNames.includes(track));

	return songsWithLyrics.map((songWithLyrics) => {
		return {
			options: shuffleArr([ songWithLyrics.name, ...getRandomElements(3, filteredTrackNames) ]),
			correctOption: songWithLyrics.name,
			lyrics: getRandomLyrics(songWithLyrics.lyrics)
		};
	});
}

async function getArtistInfo(artistId) {
	const docRef = db.collection('songs').doc(artistId);
	const doc = await docRef.get();
	return doc.data();
}

async function getSongWithLyrics(artistId, songId) {
	//returns a Promise
	const docRef = db.collection('songs').doc(artistId).collection('withLyrics').doc(songId);
	return docRef.get();
}

function getRandomLyrics(lyricsArr) {
	const randomIndex = Math.floor(Math.random() * (lyricsArr.length - 4));
	return [ `"${lyricsArr[randomIndex]}`, `${lyricsArr[randomIndex + 1]}`, `${lyricsArr[randomIndex + 2]}"` ];
}

module.exports = gameApi;
