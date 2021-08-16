import React, { useState, useEffect, useContext } from 'react';
import Round from '../round/Round.js';
import FinalResults from '../finalResults/FinalResults.js';
import './Game.css';

import { SocketContext } from '../../contexts/socket.js';
import Loader from '../loader/Loader.js';

const initialGameState = {
	currentRound: 1,
	score: 0,
	roundOptions: null,
	roundLyrics: null
};

const Game = ({ artistName }) => {
	const socket = useContext(SocketContext);
	const [ gameOver, setGameOver ] = useState(false);
	const [ gameState, setGameState ] = useState(initialGameState);

	useEffect(() => {
		socket.on('newRound', (newGameState) => {
			setGameState(newGameState);
		});
		socket.on('gameOver', ({ totalScore }) => {
			setGameOver(true);
			setGameState((gameState) => {
				return { ...gameState, score: totalScore };
			});
		});
		return () => {
			socket.off('newRound');
			socket.off('gameOver');
		};
	}, []);

	return (
		<div className="game">
			{gameOver ? (
				<FinalResults gameScore={gameState.score} artistName={artistName} />
			) : gameState.roundLyrics && gameState.roundOptions ? (
				<Round
					currentRound={gameState.currentRound}
					gameScore={gameState.score}
					roundOptions={gameState.roundOptions}
					roundLyrics={gameState.roundLyrics}
				/>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default Game;
