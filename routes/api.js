const express = require('express');
const { sendSongsFromRandomAlbums } = require('../controllers/apiController');
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

module.exports = router;
