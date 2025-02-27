import mongoose from "mongoose";
const { Schema, model } = mongoose;

const todoSchema = new Schema({
    description: { type: String, required: true },
    done: { type: Boolean, required: true },
    created: { type: Date, default: Date.now },
});

const Todo = model('Todo', todoSchema);
export default Todo;