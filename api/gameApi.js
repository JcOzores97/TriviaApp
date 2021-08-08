const io = require('socket.io')();
const events = require('events');

const gameApi = {
	io: io
};

const gameConfig = {
	secondsPerRound: 45,
	roundsQuantity: 3
};

const exampleOptions = [
	[ 'song1.1', 'song1.2', 'song1.3', 'song1.4' ],
	[ 'song2.1', 'song2.2', 'song2.3', 'song2.4' ]
];
const exampleLyrics = 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum ';
const exampleCorrectAnswer = 'song1.2';

//socket events to emit:
//newRound
//wrongAnswer
//secondsRemainingUpdate
//gameOver

//socket events to listen :
//selectedOption

io.on('connection', function(socket) {
	const eventEmitter = new events.EventEmitter();

	let secondsRemaining = gameConfig.secondsPerRound;
	let currentRound = 1;
	let score = 0;
	let roundAttempts = 0;
	const options = exampleOptions;
	const correctAnswer = exampleCorrectAnswer;
	const lyrics = exampleLyrics;
	let timerId = null;

	eventEmitter.on('gameStart', handleGameStart);

	eventEmitter.on('newRound', handleNewRound);

	eventEmitter.on('roundEnd', handleRoundEnd);

	eventEmitter.on('gameOver', handleGameOver);

	eventEmitter.emit('gameStart');

	function handleGameStart() {
		socket.on('selectedOption', (clientData) => {
			if (clientData.answer === correctAnswer) {
				eventEmitter.emit('roundEnd', false);
			} else {
				roundAttempts++;
				socket.emit('wrongAnswer', { result: false });
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

		socket.emit('newRound', { currentRound, options: options[currentRound - 1], lyrics, score });
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

module.exports = gameApi;
