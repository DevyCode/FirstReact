import React, {useState, useRef, useEffect} from "react";
import Todolist from "./Todolist";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()


  //loading stored Todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, []) // because of empty array it will never recall this useEffect


  //storing todos
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addButtonClicked(e){
    e.preventDefault()
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(previousTodos => {
      return [...previousTodos, {id: uuidv4(), name: name, complete:false}] 
    })
    todoNameRef.current.value = null
  }

  function toggleTodo(id){
    const newTodos = [...todos]     //create a copy before modifying it
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todos => !todos.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <Todolist todoList = {todos} toggleTodo = {toggleTodo}/> 
    <input ref={todoNameRef} type="text"/>
    <button onClick={addButtonClicked}>Add todo</button>
    <button onClick={handleClearTodos}> Clear completed</button>
    <div> {todos.filter(todo => !todo.complete).length} left to do</div>
    </>
    
  )
}

export default App;
