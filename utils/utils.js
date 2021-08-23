const utils = {};

utils.shuffleArr = function(arr) {
	//Fisher–Yates shuffle
	let shuffledArr = [ ...arr ];
	for (let i = 0; i < arr.length - 2; i++) {
		let random = Math.floor(Math.random() * (arr.length - i) + i);
		[ shuffledArr[random], shuffledArr[i] ] = [ shuffledArr[i], shuffledArr[random] ];
	}
	return shuffledArr;
};

utils.getRandomNumbers = function(qty, maxNumber) {
	//incluye el maxNumber
	const indexes = Array.from(Array(maxNumber), (_, index) => index);
	let randomNumbers = utils.shuffleArr(indexes);
	return randomNumbers.slice(0, qty);
};

utils.getRandomElements = function(tracksQty, tracks) {
	const randomIndexes = utils.getRandomNumbers(tracksQty, tracks.length - 1);
	return randomIndexes.map((randomIndex) => tracks[randomIndex]);
};
module.exports = utils;
