import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteTodo, updateTodo } from "../features/todos/todosSlice"

export default function GoalItem({ todo }) {
    const dispatch = useDispatch()

    const [todoCompleted, setTodoCompleted] = useState(todo.completed)


    const updateCurrentTodo = (e) => {
        e.preventDefault()
        console.log(todoCompleted)
        setTodoCompleted(prev => !prev)
        console.log(todoCompleted)
        const id = todo._id
        const newTodo = {
            _id: todo._id,
            text: todo.text,
            completed: todoCompleted
        }
        dispatch(updateTodo({ id, newTodo }))
    }

    return (
        <div className='todo'>
            <label htmlFor="completed" aria-label="completed"></label>
            {todo.completed ? <h1>True</h1> : <h1>False</h1>}
            <input
                type="checkbox"
                id="completed"
                onChange={updateCurrentTodo}
                checked={todoCompleted}
            />
            <p>{todo.text}</p>
            <button onClick={() => dispatch(deleteTodo(todo._id))} className="close">X</button>
        </div>
    )
}
