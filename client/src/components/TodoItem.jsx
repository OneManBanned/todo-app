import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { deleteTodo, updateTodo } from "../features/todos/todosSlice"

export default function TodoItem({ todo }) {

    const dispatch = useDispatch()

    const updateCurrentTodo = () => {
        dispatch(updateTodo(todo._id))
    }

    useEffect(() => {
    }, [todo])

    return (
        <div className='todo'>
            <label htmlFor="completed" aria-label="completed"></label>
            {todo.completed ? <h1>True</h1> : <h1>False</h1>}
            <input
                type="checkbox"
                id="completed"
                onChange={updateCurrentTodo}
                checked={todo.completed}
            />
            <p>{todo.text}</p>
            <button onClick={() => dispatch(deleteTodo(todo._id))} className="close">X</button>
        </div>
    )
}
