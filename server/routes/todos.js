import express from 'express';
import Todo from '../model/Todo.js';
import authenticateToken from '../middleware/authMiddleware.js';


const router = express.Router();

const getFilteredTodos = async (status, userId) => {
  const filter = { user: userId };
  if (status) filter.done = status === "done";
  return await Todo.find(filter);
};

router.get("/", authenticateToken, async (req, res) => {
  try {
    const { status } = req.query;

    const todos = await getFilteredTodos(status, req.user._id);
    res.json(todos);
  } catch (error) {
    console.error("❌ Error fetching todos:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { text, done } = req.body;
    const newTodo = await Todo.create({ text, done, user: req.user._id });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("❌ Error adding todo:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
});

router.patch("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { done } = req.body;

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    if (todo.user !== req.user._id) {
      return res.status(403).json({ error: "Not authorized to update this todo" });
    }

    todo.done = done;
    await todo.save();
    res.json(todo);

  } catch (error) {
    console.error("❌ Error updating todo:", error);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    console.error("❌ Error deleting todo:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;