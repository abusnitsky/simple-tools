import React, { useState, useEffect, use } from 'react'
import axios from 'axios'

function Todo() {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState('');
    const [todoDone, setTodoDone] = useState(false);
    const [todoFilter, setTodoFilter] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/todos', { text: todoText, done: todoDone })
            .then(response => setTodos([...todos, response.data]))
            .catch(error => console.error('Error:', error));
        setTodoText('');
    }

    const handleCheckbox = (index) => {
        const newTodos = [...todos];
        newTodos[index].done = !newTodos[index].done;
        setTodos(newTodos);
    }

    useEffect(() => {
        axios.get('http://localhost:8080/todos')
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className='todo-page'>
            <div className='todo-container'>
                <div className='new-todo-row'>
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='New Todo'
                            value={todoText} onChange={(e) => setTodoText(e.target.value)}></input>
                        <button type='submit'>Add</button>
                    </form>
                </div>
                <div className='todo-list-row'>
                    <div className='todo-list-nav-row'>
                        <button>Active</button>
                        <button>Done</button>
                    </div>
                    <div className='todo-list'>
                        {todos.map((todo, index) => (
                            <div key={index} className='todo-item'>
                                <input type='checkbox' checked={todo.done ? true : false} onChange={() => handleCheckbox(index)}></input>
                                <span>{todo.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/*                 <input type='text' placeholder='New todo' value={todoText} onChange={(e) => setTodoText(e.target.value)}></input>
                <button onClick={() => setTodos([...todos, {text: todoText, done: todoDone}])}>Add</button>
                <div className='todo-list'>
                    {todos.map((todo, index) => (
                        <div key={index} className='todo-item'>
                            <input type='checkbox'></input>
                            <span>{todo.text}</span>
                        </div>
                    ))}
                </div> */}
            </div>

        </div>
    )
}

export default Todo