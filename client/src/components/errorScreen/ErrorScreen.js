import React from 'react';
import './ErrorScreen.css';
const ErrorScreen = ({ artistName, type }) => {
	const serverErrorText = 'Momentaneamente el servicio no está disponible, intenta nuevamente más tarde';
	const artistNotFoundText = `Mmm... parece que no hemos encontrado un artista con el nombre "${artistName}". 
	Verifica que lo hayas escrito correctamente o refresca la página e intenta con otro artista!`;
	const insuficientLyricsText = `Lamentablemente no contamos con suficientes letras de canciones del artista seleccionado. 
		¡Refresca la página e intenta con otro artista!`;
	const lyricsProviderErrorText =
		'Parece que ocurre un error en el proveedor de las letras, intente jugar nuevamente más tarde';
	return (
		<div className="error-screen">
			<h2 className="error-screen__text">
				{type === 'artist not found' ? (
					artistNotFoundText
				) : type === 'Insufficient lyrics' ? (
					insuficientLyricsText
				) : type === 'Lyrics provider error' ? (
					lyricsProviderErrorText
				) : (
					serverErrorText
				)}
			</h2>
		</div>
	);
};
export default ErrorScreen;
