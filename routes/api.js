const express = require('express');
const { sendSongsFromRandomAlbums, sendSongsLyrics } = require('../controllers/apiController');
const router = express.Router();

router.get('/artist/:name/songs/:maxAlbumsQty', async (req, res) => {
	try {
		await sendSongsFromRandomAlbums(req.params.name, req.params.maxAlbumsQty, res);
	} catch (err) {
		if (err.message === 'artist not found') {
			res.status(404).send(err.message);
		} else {
			res.status(500).send('Internal Server Error');
		}
	}
});

router.post('/artist/:name/lyrics/:lyricsQty', async (req, res) => {
	try {
		await sendSongsLyrics(req.body.songs, req.params.name, req.params.lyricsQty, res);
	} catch (err) {
		res.status(500).send(`${error.message === 'Lyrics provider error' ? error.message : 'Internal Server Error'}`);
	}
});

module.exports = router;
