const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const uri = "mongodb+srv://abusnitsky:devpass@simpletools.ngo3l.mongodb.net/?retryWrites=true&w=majority&appName=SimpleTools";



const corsOptions = {
    origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

app.get('/test', (req, res) => {
    res.send('Hello World');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});