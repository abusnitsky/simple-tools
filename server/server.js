import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import todoRoutes from './routes/todos.js';

const app = express();
const uri = "mongodb+srv://abusnitsky:devpass@simpletools.ngo3l.mongodb.net/simptdb?retryWrites=true&w=majority&appName=SimpleTools";

const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/todos', todoRoutes);

mongoose.connect(uri)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

app.listen(8080, () => console.log('Server is running on port 8080'));

