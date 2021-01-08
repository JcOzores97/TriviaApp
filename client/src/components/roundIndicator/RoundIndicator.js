import React from 'react';
import './RoundIndicator.css';

const RoundIndicator = ({ currentRound, roundsQuantity }) => {
	const roundsArr = Array.from(Array(roundsQuantity), (_, index) => index + 1);
	return (
		<div className="round-indicator">
			{roundsArr.map((round) => {
				return (
					<div
						key={round}
						className={round === currentRound ? 'round-indicator__round--active' : 'round-indicator__round'}
					>
						{round}
					</div>
				);
			})}
		</div>
	);
};

export default RoundIndicator;
