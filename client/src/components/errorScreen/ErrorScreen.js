import React from 'react';
import './ErrorScreen.css';
const ErrorScreen = ({ artistName, type }) => {
	const serverErrorText = 'Momentaneamente el servicio no está disponible, intenta nuevamente más tarde';
	const artistNotFoundText = `Mmm... parece que no hemos encontrado un artista con el nombre "${artistName}". 
	Verifica que lo hayas escrito correctamente o refresca la página e intenta con otro artista!`;
	const insuficientLyricsText = `Lamentablemente no contamos con suficiente información sobre el artista. 
		Refresca la página e intenta con otro artista!`;
	return (
		<div className="error-screen">
			<h2 className="error-screen__text">
				{type === 'artist not found' ? (
					artistNotFoundText
				) : type === 'insufficient lyrics' ? (
					insuficientLyricsText
				) : (
					serverErrorText
				)}
			</h2>
		</div>
	);
};
export default ErrorScreen;
