import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../../contexts/socket.js';
import RoundIndicator from '../roundIndicator/RoundIndicator.js';
import RoundInfo from '../roundInfo/RoundInfo.js';
import { ReactComponent as ClockIcon } from '../icons/clockIcon.svg';
import { ReactComponent as StarIcon } from '../icons/starIcon.svg';
import './Round.css';

const Round = ({ currentRound, gameScore, roundOptions, roundLyrics }) => {
	const socket = useContext(SocketContext);
	const [ selectedOptions, setSelectedOptions ] = useState([]);
	const [ secondsRemaining, setSecondsRemaining ] = useState('45');

	useEffect(
		() => {
			socket.on('secondsRemainingUpdate', (secondsUpdate) => {
				setSecondsRemaining(secondsUpdate);
			});

			return () => {
				socket.off('secondsRemainingUpdate');
				setSelectedOptions([]);
			};
		},
		[ currentRound ]
	);

	function handleOptionClick(ev) {
		setSelectedOptions([ ...selectedOptions, ev.target.value ]);
		socket.emit('selectedOption', { answer: ev.target.value });
	}
	return (
		<div className="round">
			<RoundIndicator currentRound={currentRound} roundsQuantity={5} />
			<div className="round__round-info-container">
				<RoundInfo info={gameScore}>
					<StarIcon />
				</RoundInfo>
				<RoundInfo info={secondsRemaining}>
					<ClockIcon />
				</RoundInfo>
			</div>

			<div className="round__lyrics">
				{roundLyrics.map((parragraph, index) => <p key={index}>{parragraph}</p>)}
			</div>
			<div className="round__options-container">
				{roundOptions.map((option, index) => {
					return (
						<button
							value={option}
							key={`${option}_${currentRound}`}
							disabled={selectedOptions.includes(option)}
							onClick={handleOptionClick}
							className="round__option"
							style={{ '--animation-order': index + 1 }}
						>
							{option}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Round;
