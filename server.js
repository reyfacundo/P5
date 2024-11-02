// const router = require('./routes/index')
const mongoose = require('mongoose');
const UserSchema = require('./models/users')
const AlbumSchema = require('./models/album')
const usersRouter = require('./routes/albums')
const albumsRouter = require('./routes/albums')

const express = require('express')
const app = express()
const path = require("path");
const url = "mongodb+srv://plataforma5:gBDlFb8ukIUuYovz@curso-intro.sputp.mongodb.net/?retryWrites=true&w=majority&appName=Curso-intro"

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));
app.use('/users', usersRouter);
app.use('/band', albumsRouter);

const connectToMongo = async () => {
    try {
        await mongoose.connect(url)
        app.listen(3000, () => {
            console.log('Server listening on port 3000')
        });
    } catch (error) {
        console.error(error)
    }
}
connectToMongo()