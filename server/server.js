import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Todo from './model/Todo.js';
const app = express();
const uri = "mongodb+srv://abusnitsky:devpass@simpletools.ngo3l.mongodb.net/?retryWrites=true&w=majority&appName=SimpleTools";

const corsOptions = {
    origin: 'http://localhost:5173',
};

mongoose.connect(uri);
app.use(cors(corsOptions));


app.get('/test', (req, res) => {
    res.send('Hello World');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

