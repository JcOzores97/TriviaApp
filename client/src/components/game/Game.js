import React, { useReducer } from 'react';
import Round from '../round/Round.js';
import FinalResults from '../finalResults/FinalResults.js';
import './Game.css';
function gameReducer(state, action) {
	switch (action.type) {
		case 'ENDED_ROUND':
			return {
				currentRound: state.currentRound + 1,
				gameScore: state.gameScore + action.payload.roundScore
			};
		default:
			throw new Error();
	}
}
const initialGameState = {
	currentRound: 1,
	gameScore: 0
};
const Game = ({ artistName, gameOptions }) => {
	const [ gameState, dispatch ] = useReducer(gameReducer, initialGameState);

	return (
		<div className="game">
			{gameState.currentRound <= 5 ? (
				<Round
					currentRound={gameState.currentRound}
					gameDispatch={dispatch}
					gameScore={gameState.gameScore}
					roundOptions={gameOptions[gameState.currentRound - 1]}
					correctOption={gameOptions[gameState.currentRound - 1].find((option) => 'lyrics' in option)}
				/>
			) : (
				<FinalResults gameScore={gameState.gameScore} artistName={artistName} />
			)}
		</div>
	);
};

export default Game;
