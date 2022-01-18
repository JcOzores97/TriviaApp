import React, { useState, useRef, useEffect } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import './FinalResults.css';
import { ReactComponent as StarIcon } from '../icons/starIcon.svg';
const FinalResults = ({ gameScore }) => {
	const refAnimationInstance = useRef(null);

	const getInstance = (instance) => {
		refAnimationInstance.current = instance;
	};

	const makeShot = (particleRatio, opts) => {
		refAnimationInstance.current &&
			refAnimationInstance.current({
				...opts,
				origin: { y: 0.4 },
				particleCount: Math.floor(200 * particleRatio)
			});
	};

	const fire = () => {
		makeShot(0.25, {
			spread: 26,
			startVelocity: 55
		});

		makeShot(0.2, {
			spread: 60
		});

		makeShot(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8
		});

		makeShot(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			scalar: 1.2
		});

		makeShot(0.1, {
			spread: 120,
			startVelocity: 45
		});
	};

	useEffect(() => {
		fire();
	}, []);

	return (
		<div className="final-results">
			<ReactCanvasConfetti className={'final-results__confetti'} refConfetti={getInstance} />
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
