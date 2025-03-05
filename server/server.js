import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import todoRoutes from './routes/todos.js';
import eventRoutes from './routes/events.js';
import config from './config/config.js';

const app = express();

app.use(cors(config.corsOptions));
app.use(express.json());
app.use('/todos', todoRoutes);
app.use('/events', eventRoutes);

mongoose.connect(config.mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

app.listen(8080, () => console.log('Server is running on port 8080'));

