const mongoose = require('mongoose');
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const UserSchema = require('./models/users');
const AlbumSchema = require('./models/album');
const userRouter = require('./routes/users');
const albumRouter = require('./routes/albums');

const port = process.env.PORT;
const uri = process.env.DATABASE_URL;

const express = require('express');
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/users', userRouter);
app.use('/band', albumRouter);

(async () => {
    try {
        await mongoose.connect(uri)
        app.listen(port, () => {
            console.log('Server listening on port 3000');
        });
    } catch (error) {
        console.error(error);
    }
})();
