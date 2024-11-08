const express = require('express');
const albums = require('../models/album');
const authToken = require('./middlewares/auth')
const albumRouter = express.Router();

albumRouter.post('/', authToken ,async (req, res) => {
    try {
        const newAlbum = await albums.create(req.body); 
        res.status(201).json(newAlbum); 
        } catch (error) {
        console.error(error);
        res.status(500).send('Error when creating the album');
    }
});
albumRouter.post('/:id',authToken, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await albums.findById(id);
        if(!result) throw new Error
        result.songs.push(req.body);
        await result.save();
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(404).send("No data available");
    }
})
albumRouter.get('/',authToken, async (req, res) => {
    try {
        const result = await albums.find({});
        if(!result) throw new Error
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(401).send("No data available");
    }
});
albumRouter.get('/:id',authToken, async (req, res) => {
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
albumRouter.patch('/:id',authToken, async (req, res) => {
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
albumRouter.delete('/:albumId/:songId',authToken, async (req, res) => {
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
albumRouter.delete('/:id',authToken, async (req, res) => {
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

module.exports = albumRouter;
