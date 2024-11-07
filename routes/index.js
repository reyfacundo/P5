// const express = require('express');
// const albums = require('../models/album');
// const users = require('../models/users');
// const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// router.post('/user', async (req, res) => {
//     try {
//         await users.create(req.body)
//         res.status(201).send("User created");
//     } catch (error) {
//         console.error(error)
//         res.status(500).send("Error when creating the user");
//     }
// });
// router.get('/user', async (req, res) => {
//     try {
//         const result = await users.find({});
//         if(!result) throw new Error
//         res.status(200).send(result);
//     } catch (error) {
//         console.error(error)
//         res.status(404).send("No data available");
//     }
// });
// router.get('/user/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await users.findById(id);
//         if(!result) throw new Error
//         const { name, email, favorites } = result;
//         const user = { name, email, favorites }
//         res.status(200).send(user);
//     } catch (error) {
//         console.error(error)
//         res.status(404).send("No data available");
//     }
// });
// router.patch('/user/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updates = req.body;
//         const result = await users.findByIdAndUpdate(id, updates);
//         if(!result) throw new Error
//         res.status(200).send(result);
//     } catch (error) {
//         console.error(error)
//         res.status(500).send("Couldn't update the user");
//     }
// });
// router.post('/band', async (req, res) => {
//     try {
//         await albums.create(req.body)
//         res.status(201).send('Album created');
//         } catch (error) {
//         console.error(error);
//         res.status(500).send('Error when creating the album');
//     }
// });
// router.get('/band', async (req, res) => {
//     try {
//         const result = await albums.find({});
//         if(!result) throw new Error
//         res.status(200).send(result);
//     } catch (error) {
//         console.error(error)
//         res.status(404).send("No data available");
//     }
// });
// router.get('/band/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await albums.findById(id);
//         if(!result) throw new Error
//         res.status(200).send(result);
//     } catch (error) {
//         console.error(error)
//         res.status(404).send("No data available");
//     }
// });
// router.patch('/band/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updates = req.body;
//         const result = await albums.findByIdAndUpdate(id, updates);
//         if(!result) throw new Error
//         res.status(200).send(result);
//     } catch (error) {
//         console.error(error)
//         res.status(500).send("Couldn't update the album");
//     }
// });
// router.delete('/band/:albumId/:songId', async (req, res) => {
//     try {
//         const { albumId, songId } = req.params;
//         const album = await albums.findById(albumId);
//         if(!album) throw new Error('Album not found');
//         const song = album.songs.find(e => e._id == songId)
//         if(!song) throw new Error('Song not found');
//         album.songs = album.songs.filter(e => e._id != songId);
//         await album.save();
//         res.status(200).send(song);
//     } catch (error) {
//         console.error(error)
//         res.status(404).send("No data available");
//     }
// });
// router.delete('/band/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await albums.findByIdAndDelete(id);
//         if(!result) throw new Error
//         res.status(200).send(result);
//     } catch (error) {
//         console.error(error)
//         res.status(404).send("No data available");
//     }
// });


// module.exports = router;

