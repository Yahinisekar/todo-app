import React, { useState, useEffect } from 'react';


function TodoApp() {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [editIndex, setEditIndex] = useState(null);
    const [editTaskName, setEditTaskName] = useState('');
    const [editTaskDescription, setEditTaskDescription] = useState('');
    const [editTaskStatus, setEditTaskStatus] = useState('');

    // Load todos from local storage on component mount
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    // Save todos to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTask = () => {
        if (taskName.trim() !== '' && taskDescription.trim() !== '') {
            const newTodo = {
                taskName: taskName.trim(),
                taskDescription: taskDescription.trim(),
                status: 'pending'
            };
            setTodos([...todos, newTodo]);
            setTaskName('');
            setTaskDescription('');
        } else {
            alert('Please enter task name and description.');
        }
    }

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditTaskName(todos[index].taskName);
        setEditTaskDescription(todos[index].taskDescription);
        setEditTaskStatus(todos[index].status);
    }

    const handleSave = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].taskName = editTaskName;
        updatedTodos[index].taskDescription = editTaskDescription;
        updatedTodos[index].status = editTaskStatus;
        setTodos(updatedTodos);
        setEditIndex(null);
        setEditTaskName('');
        setEditTaskDescription('');
        setEditTaskStatus('');
    }

    const handleDelete = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    }

    const filteredTodos = filter === 'all' ? todos :
        filter === 'completed' ? todos.filter(todo => todo.status === 'completed') :
        todos.filter(todo => todo.status === 'pending');

    return (
        <div className="container py-5">
            <h3 className='text-center mb-4'>My Todo</h3>
            <div className="input-section input-group">
                <input
                    type="text"
                    placeholder="Todo Name"
                    value={taskName} className='form-control me-3 rounded'
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Todo description"
                    value={taskDescription} className='form-control me-3 rounded'
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
                <button onClick={handleAddTask} className='btn success rounded'>Add Todo</button>
            </div>
            <div className='d-flex  justify-content-between align-items-center my-4 mt-5'>
                <h5>My Todos</h5>
            <div className="filter-section">

                <span className='me-2'>Status Filter:</span>
                <select className='select-control rounded' style={{background:'rgb(251,128,127)'}} value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
                </div>
                </div>
            <div id="todo-list">
                  <div className='row'>
                {filteredTodos.map((todo, index) => (
                    <div className="todo-item col-4 mb-4" key={index}>
                        
                          
                        {editIndex === index ? (
                            <div className='card h-100'>
                                <input
                                    type="text"
                                    value={editTaskName} className='form-control rounded'
                                    onChange={(e) => setEditTaskName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={editTaskDescription} className='form-control rounded'
                                    onChange={(e) => setEditTaskDescription(e.target.value)}
                                />
                                <select
                                    value={editTaskStatus} className='select-control rounded'
                                    onChange={(e) => setEditTaskStatus(e.target.value)}
                                >
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                </select>
                                <button className='btn success mt-auto'onClick={() => handleSave(index)}>Save</button>
                            </div>
                        ) : (
                               
                            <div className='card'>
                                <p>Name: {todo.taskName}</p>
                                <p>Description: {todo.taskDescription}</p>
                                <span className=''>Status: <select
                                        value={todo.status} className='select-control rounded color'
                                        style={{background:todo.status==='completed'?'rgb(19,173,137)':'rgb(251,128,127)'}}
                                    onChange={(e) => { 
                                        const updatedTodos = [...todos];
                                        updatedTodos[index].status = e.target.value;
                                        setTodos(updatedTodos);
                                        
                                    }}>
                                    <option value="completed" className='bg-danger'>Completed</option>
                                    <option value="pending" className='bg-green'>Not completed</option>
                                    </select>
                                </span>
                                        
                                <div className='buttons'>
                                    <button onClick={() => handleEdit(index)} className='edit success btn'>Edit</button>
                                    <button onClick={() => handleDelete(index)} className='btn btn-danger'>Delete</button>
                                </div>
                                    </div>
                        )}
                    </div>
                ))}
                    
                        </div>
            </div>
        </div>
    );
}

export default TodoApp;