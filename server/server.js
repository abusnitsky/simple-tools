import express from 'express';
//import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Todo from './model/Todo.js';

const app = express();
const uri = "mongodb+srv://abusnitsky:devpass@simpletools.ngo3l.mongodb.net/simptdb?retryWrites=true&w=majority&appName=SimpleTools";

/* const corsOptions = {
    origin: 'http://localhost:5173',
}; */

//app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(uri)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

app.post("/todos", async (req, res) => {
    try {
      const newTodo = await Todo.create(req.body);
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: "Failed to add item" });
    }
  });

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.send(todos);
});

app.listen(8080, () => console.log('Server is running on port 8080'));

