const express = require('express');
const router = express.Router();
const multer = require('multer');
const Artwork = require('../models/Artwork');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch artworks' });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const artwork = new Artwork({
      title: req.body.title,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : ''
    });
    await artwork.save();
    res.json(artwork);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create artwork' });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const update = { title: req.body.title };
    if (req.file) update.imageUrl = `/uploads/${req.file.filename}`;
    const updatedArtwork = await Artwork.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updatedArtwork);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update artwork' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Artwork.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete artwork' });
  }
});

module.exports = router;
