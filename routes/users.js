const express = require('express');
const users = require('../models/users');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.SECRET_KEY;

const saltRound = 10;
const hashPassword = async (pass) => {
    const hash = await bcrypt.hash(pass, saltRound);
    return hash
}
const checkPassword = async (pass, dbpass)=>{
    const match = await bcrypt.compare(pass, dbpass);
    return match
}

userRouter.post('/signup', async (req, res) => {
    let { name, lastName = '', email, password } = req.body;
    let newUser = { name, email, password };
    
    if (lastName.trim() !== '') {
        newUser.lastName = lastName.trim();
    }
    if(password.length < 8){
        throw new Error('Password must be 8 characters or longer');
    }

    try {
        const hashedPassword = await hashPassword(password);

        newUser.password = hashedPassword

        await users.create(newUser)
        res.status(201).send("User created");
    } catch (error) {
        console.error(error)
        res.status(500).send("Error when creating the user");
    }
});
userRouter.get('/' ,async (req, res) => {
    try {
        const result = await users.find({});
        if (!result) throw new Error
        res.status(200).send(result);
    } catch (error) {
        console.error(error)
        res.status(404).send("No data available");
    }
});
userRouter.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await users.findOne({email});
        if (!user) throw new Error
        const result = await checkPassword(password, user.password);
        if(result){
            const payload = {
                name: user.name,
                email: user.email,
                favorites: user.favorites
            }
            const token = jwt.sign(payload, secret, {expiresIn: '3h'});
            res.cookie("token", token,{
                maxAge: 3*60*60*1000,
                httpOnly:true
            });
            res.status(200).send({ message: "Login successful" });
        } else{
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        console.error(error)
        res.status(404).send("Invalid credentials");
    }
});
userRouter.get('/:id', async (req, res) => {
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
userRouter.patch('/:id', async (req, res) => {
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
userRouter.post('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 0, httpOnly: true });
    res.status(200).send({ message: "Logout successful" });
});


module.exports = userRouter;