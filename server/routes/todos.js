import express from 'express';
import Todo from '../model/Todo.js';

const router = express.Router();

// Function to Apply Filtering
const getFilteredTodos = async (status) => {
  const filter = status ? { done: status === "done" } : {};
  return await Todo.find(filter);
};

// GET: Fetch Todos with filtering
router.get("/", async (req, res) => {
    try {
      const { status } = req.query;
  
      const todos = await getFilteredTodos(status);
      res.json(todos);
    } catch (error) {
      console.error("❌ Error fetching todos:", error);
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const newTodo = await Todo.create(req.body);
      res.status(201).json(newTodo);
    } catch (error) {
      console.error("❌ Error adding todo:", error);
      res.status(500).json({ error: "Failed to add item" });
    }
  });
  
  // PATCH: Update ToDo status
  router.patch("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { done } = req.body;
  
      const updatedTodo = await Todo.findByIdAndUpdate(id, { done }, { new: true });
  
      if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });
  
      res.json(updatedTodo);
    } catch (error) {
      console.error("❌ Error updating todo:", error);
      res.status(500).json({ error: "Failed to update todo" });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;

      const deletedTodo = await Todo.findByIdAndDelete(id);

      if (!deletedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      const todos = await getFilteredTodos(status);
      res.json(todos);
    } catch (error) {
      console.error("❌ Error deleting todo:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  export default router;