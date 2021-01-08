import React from 'react';
import './FinalResults.css';
import { ReactComponent as StarIcon } from '../icons/starIcon.svg';
const FinalResults = ({ gameScore }) => {
	return (
		<div className="final-results">
			<div className="final-results__star-container">
				<StarIcon />
			</div>
			<h2>Terminó el juego</h2>
			<h3>Obtuviste {gameScore} puntos</h3>
			<h3>Refresca la página para jugar de nuevo</h3>
		</div>
	);
};

export default FinalResults;
