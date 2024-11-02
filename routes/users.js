const express = require('express');
const users = require('../models/users');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await users.create(req.body)
        res.status(201).send("User created");
    } catch (error) {
        console.error(error)
        res.status(500).send("Error when creating the user");
    }
});
router.get('/', async (req, res) => {
    try {
        const result = await users.find({});
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
        const result = await users.findById(id);
        if(!result) throw new Error
        const { name, email, favorites } = result;
        const user = { name, email, favorites }
        res.status(200).send(user);
    } catch (error) {
        console.error(error)
        res.status(404).send("No data available");
    }
});
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const result = await users.findByIdAndUpdate(id, updates);
        if(!result) throw new Error
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(500).send("Couldn't update the user");
    }
});


module.exports = router;
