const express = require('express');
const users = require('../models/users');
const router = express.Router();
const bcrypt = require('bcrypt');

const saltRound = 10;

const hashPassword = async (pass) => {
    const hash = await bcrypt.hash(pass, saltRound);
    return hash
}
const checkPassword = async (pass, dbpass)=>{
    const match = await bcrypt.compare(pass, dbpass);
}

router.post('/signup', async (req, res) => {
    let { name, lastName, email, password } = req.body
    let newUser = { name, email, password };
    
    lastName = lastName.trim();

    try {
        const hashedPassword = await hashPassword(password);

        if (lastName !== '') {
            newUser.lastName = lastName;
        }

        newUser.password = hashedPassword

        await users.create(newUser)
        res.status(201).send("User created");
    } catch (error) {
        console.error(error)
        res.status(500).send("Error when creating the user");
    }
});
router.get('/', async (req, res) => {
    try {
        const result = await users.find({});
        if (!result) throw new Error
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(404).send("No data available");
    }
});
router.get('/logIn', async (req, res) => {
    try {
        const {email} = req.body
        const user = await users.find({email});
        if (!user) throw new Error
        res.status(200).send(user);
    } catch (error) {
        console.error(error)
        res.status(404).send("No data available");
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await users.findById(id);
        if (!result) throw new Error
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
        if (!result) throw new Error
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(500).send("Couldn't update the user");
    }
});


module.exports = router;
