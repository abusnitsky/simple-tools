import React, { useState, useEffect, use } from 'react'
import axios from 'axios'
import styles from './Todo.module.css'
import config from '../config.js'
import addIcon from '../assets/add_24dp.svg'

function Todo() {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState('');
    const [todoDone, setTodoDone] = useState(false);
    const [filter, setFilter] = useState('active');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(config.TODO_API_URL, { text: todoText, done: todoDone })
            .then(response => setTodos([...todos, response.data]))
            .catch(error => console.error('Error:', error));
        setTodoText('');
    }

    const toggleDone = (id, done) => {
        axios.patch(`${config.TODO_API_URL}/${id}`, { done: !done })
            .then(response => setTodos(prevTodos => prevTodos.map(todo => todo._id === id ? response.data : todo)))
            .catch(error => console.error('Error:', error));
    }

    const handleDelete = (id) => {
        axios.delete(`${config.TODO_API_URL}/${id}?status=${filter}`)
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        axios.get(`${config.TODO_API_URL}?status=${filter !== "all" ? filter : ""}`)
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error:', error));
    }, [filter]);

    return (
        <div className={styles.todoPage}>
            <div className={styles.todoContainer}>
                <div className={styles.todoTitle}>To Do</div>
                <div className={styles.newTodoRow}>
                    <form className={styles.newTodoForm} onSubmit={handleSubmit}>
                        <input className={styles.newTodoInput}
                            type='text'
                            placeholder='New Todo'
                            value={todoText}
                            onChange={(e) => setTodoText(e.target.value)}
                        />
                        <button className={styles.addTodoButton}
                            type='submit'>
                            <img src={addIcon} alt='Add' />
                        </button>
                    </form>
                </div>
                <div className={styles.todoListContainer}>
                    <div className={styles.todoListRowNav}>
                        <button className={styles.activeTodoButton}
                            onClick={() => setFilter("active")}>Active</button>
                        <button className={styles.doneTodoButton}
                            onClick={() => setFilter("done")}>Done</button>
                    </div>
                    <div className={styles.todoList}>
                        {todos.map(({ _id, text, done }) => (
                            <div className={styles.todoItem}
                                key={_id}>
                                <input className={styles.doneTodoCheckbox}
                                    type='checkbox'
                                    checked={done}
                                    onChange={() => toggleDone(_id, done)}
                                />
                                <span>{text}</span>
                                <button className={styles.deleteTodoButton}
                                    onClick={() => handleDelete(_id)}>X</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Todo