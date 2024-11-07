const express = require('express');
const albums = require('../models/album');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newAlbum = await albums.create(req.body); 
        res.status(201).json(newAlbum); 
        } catch (error) {
        console.error(error);
        res.status(500).send('Error when creating the album');
    }
});
router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await albums.findById(id);
        if(!result) throw new Error
        console.log(req.body)
        result.songs.push(req.body);
        await result.save();
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(404).send("No data available");
    }
})
router.get('/', async (req, res) => {
    try {
        const result = await albums.find({});
        if(!result) throw new Error
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(404).send("No data available");
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await albums.findById(id);
        if(!result) throw new Error
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(404).send("No data available");
    }
});
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const result = await albums.findByIdAndUpdate(id, updates);
        if(!result) throw new Error
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(500).send("Couldn't update the album");
    }
});
router.delete('/:albumId/:songId', async (req, res) => {
    try {
        const { albumId, songId } = req.params;
        const album = await albums.findById(albumId);
        if(!album) throw new Error('Album not found');
        const song = album.songs.find(e => e._id == songId);
        if(!song) throw new Error('Song not found');
        album.songs = album.songs.filter(e => e._id != songId);
        await album.save();
        res.status(200).send(song);
    } catch (error) {
        console.error(error)
        res.status(404).send("No data available");
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await albums.findByIdAndDelete(id);
        if(!result) throw new Error
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(404).send("No data available");
    }
});

module.exports = router;
