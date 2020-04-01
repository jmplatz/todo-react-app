import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  const formSubmitted = useCallback((event) => {
    event.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([
      {
        id: todos.length + 1,
        content: newTodo,
        done: false,
      },
      ...todos,
    ])
    setNewTodo('');
  }, [todos, newTodo]);

  useEffect(() => {
    console.log('todos', todos);
  }, [todos]);

  const addTodo = useCallback((todo, index) => (event) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done,
    });
    setTodos(newTodos);
  }, [todos]);

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  }, [todos]);

  const markAllDone = useCallback(() => {
    const updatedTodos = todos.map(todo => {
      return {
        ...todo,
        done: true,
      }
    })
    setTodos(updatedTodos);
  }, [todos]);

  return (
    <div className={'grid-wrapper'}>
      <div className={'app'}>
        <h1>Todo List</h1>
        <form onSubmit={formSubmitted}>
          <input
            placeholder=' Add Todo'
            id='newTodo'
            name='newTodo'
            value={newTodo}
            onChange={onNewTodoChange}>
          </input>
          <button className={'icon'}><FontAwesomeIcon icon={faPlusCircle} /></button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li key={todo.id}>
              <div className={'listItem'}>
                <span className={todo.done ? 'done' : ''}>{todo.content}</span>
              </div>
              <div className={'listItemButton'}>
                <button
                  id='checked'
                  onClick={addTodo(todo, index)}
                  className={'icon'}>
                  <FontAwesomeIcon icon={faCheckCircle} />
                </button>
                <button
                  id='remove'
                  onClick={removeTodo(todo)}
                  className={'icon'}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button id='markDoneButton' onClick={markAllDone}>Mark All Done</button>
      </div>
    </div >
  );
};

export default App;

