import React, { useEffect, useReducer, useRef } from 'react';
import RoundIndicator from '../roundIndicator/RoundIndicator.js';
import RoundInfo from '../roundInfo/RoundInfo.js';
import { ReactComponent as ClockIcon } from '../icons/clockIcon.svg';
import { ReactComponent as StarIcon } from '../icons/starIcon.svg';
import './Round.css';
function roundReducer(state, action) {
	switch (action.type) {
		case 'TICK':
			return { ...state, secondsRemaining: state.secondsRemaining - 1 };
		case 'ROUND_STARTS':
			return { ...initialState };
		case 'OPTION_SELECTED':
			return {
				...state,
				attempts: state.attempts + 1,
				selectedOptions: state.selectedOptions.concat(action.payload.optionIndex)
			};
		default:
			throw new Error('invalid action in round reducer');
	}
}
const initialState = {
	attempts: 0,
	secondsRemaining: 45,
	selectedOptions: []
};
function getRoundScore(attempts, endedByCorrectAnswer) {
	if (attempts === 0 && !endedByCorrectAnswer) return 0;
	if (attempts === 0 && endedByCorrectAnswer) return 10;
	return 10 - attempts * 2;
}

const Round = ({ currentRound, gameDispatch, gameScore, roundOptions, correctOption }) => {
	const [ roundState, dispatch ] = useReducer(roundReducer, initialState);
	const attemptsRef = useRef(0);
	attemptsRef.current = roundState.attempts;

	useEffect(
		() => {
			dispatch({ type: 'ROUND_STARTS' });
			const intervalo = setInterval(() => {
				dispatch({ type: 'TICK' });
			}, 1000);
			return () => {
				clearInterval(intervalo);
			};
		},
		[ currentRound ]
	);
	useEffect(
		() => {
			if (roundState.secondsRemaining === 0) {
				const roundScore = getRoundScore(attemptsRef.current, false);
				gameDispatch({ type: 'ENDED_ROUND', payload: { roundScore } });
			}
		},
		[ roundState.secondsRemaining, gameDispatch ]
	);

	function handleOptionClick(ev) {
		const selectedSong = ev.target.value;
		if (selectedSong === correctOption.song) {
			const roundScore = getRoundScore(attemptsRef.current, true);
			gameDispatch({ type: 'ENDED_ROUND', payload: { roundScore } });
			return;
		}
		dispatch({
			type: 'OPTION_SELECTED',
			payload: { optionIndex: roundOptions.findIndex((opt) => opt.song === selectedSong) }
		});
	}
	return (
		<div className="round">
			<RoundIndicator currentRound={currentRound} roundsQuantity={5} />
			<div className="round__round-info-container">
				<RoundInfo info={gameScore}>
					<StarIcon />
				</RoundInfo>
				<RoundInfo info={roundState.secondsRemaining}>
					<ClockIcon />
				</RoundInfo>
			</div>

			<div className="round__lyrics">
				{correctOption.lyrics.map((lyric, index) => {
					return <p key={index}>{lyric}</p>;
				})}
			</div>
			<div className="round__options-container">
				{roundOptions.map((option, index) => {
					return (
						<button
							value={option.song}
							key={index}
							disabled={roundState.selectedOptions.includes(index)}
							onClick={handleOptionClick}
							className="round__option"
						>
							{option.song}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Round;
