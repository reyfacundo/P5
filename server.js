const router = require('./routes/index')
const UserSchema = require('./models/users')
const AlbumSchema = require('./models/album')

const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log('Server listening on port 3000')
});

app.use('/', router);

